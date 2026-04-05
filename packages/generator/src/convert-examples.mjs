// Script to convert sanitized.json examples from Lua to TypeScript premake-ts syntax
// Run with: node packages/premake-ts-generator/src/convert-examples.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');

const data = JSON.parse(readFileSync(path.join(dataDir, 'sanitized.json'), 'utf8'));

// Build lowercase → camelCase name map from sanitized data
const nameMap = {};
data.forEach(item => {
    nameMap[item.name.toLowerCase()] = item.name;
});

// Strip trailing inline Lua comment (-- ...) from a line, respecting strings
function stripLuaComment(line) {
    let inStr = false;
    let strChar = null;
    for (let i = 0; i < line.length - 1; i++) {
        const c = line[i];
        if (inStr) {
            if (c === strChar) inStr = false;
        } else {
            if (c === '"' || c === "'") { inStr = true; strChar = c; }
            else if (c === '-' && line[i + 1] === '-') {
                return line.slice(0, i).trimEnd();
            }
        }
    }
    return line;
}

// Detect complex Lua constructs that can't be auto-converted
function isComplexLua(line) {
    return /\b(if|then|else|elseif|end|local|function|do|while|for|repeat|until)\b/.test(line)
        || line.includes('[[') || line.includes(']]')
        || /^\s*\w+\.\w+\s*=\s*/.test(line)  // e.g. prj.group = "..."
        || /^\s*\w+\s*\(\s*\)/.test(line)     // e.g. autoversion_h()
        || line.trim().startsWith('os.')
        || line.trim().startsWith('io.')
        || line.trim().startsWith('path.')
        || line.trim().startsWith('print(')
        || line.trim().startsWith('premake.');
}

// Convert Lua table `{ "a", "b" }` to spread args `"a", "b"`
// Also handles `{ ["key"] = "val", ... }` → `{ key: "val", ... }`
function tableToArgs(tableStr) {
    let inner = tableStr.trim();
    if (inner.startsWith('{')) inner = inner.slice(1).trim();
    if (inner.endsWith('}')) inner = inner.slice(0, -1).trim();
    if (inner.endsWith(',')) inner = inner.slice(0, -1).trim();
    inner = inner.trim();

    if (inner === '') return '';

    // Key-value table: ["key"] = "val" or key = "val"
    if (/\[?"?\w+"?\]\s*=/.test(inner) || /^\s*\w+\s*=\s*[^=]/.test(inner)) {
        inner = inner
            .replace(/\["(.+?)"\]\s*=\s*/g, '$1: ')
            .replace(/\[(\d+)\]\s*=\s*/g, '$1: ')
            .replace(/^(\w+)\s*=\s*/gm, '$1: ');
        return `{${inner}}`;
    }

    return inner;
}

// Convert Lua string concatenation and escaping
function convertString(str) {
    return str.replace(/\.\./g, '+');
}

// Extract quoted name or expression from a declaration line
// e.g. `workspace "MyWorkspace"` → `"MyWorkspace"`
// e.g. `workspace ("../build/" .. _ACTION)` → `"../build/" + _ACTION`
function extractDeclArg(content) {
    // funcname "string"
    let m = content.match(/^\w+\s+"(.*)"$/);
    if (m) return `"${m[1]}"`;

    m = content.match(/^\w+\s+'(.*)'$/);
    if (m) return `"${m[1]}"`;

    // funcname (expression)
    m = content.match(/^\w+\s+\((.+)\)$/);
    if (m) return convertString(m[1]);

    // funcname expression (fallback)
    m = content.match(/^\w+\s+(.+)$/);
    if (m) return convertString(m[1]);

    return '"unknown"';
}

// Extract filter arg from `filter "..."` or `filter { "a", "b" }`
function extractFilterArg(content) {
    // filter { "a", "b" } — array form
    let m = content.match(/^filter\s+(\{.+\})$/s);
    if (m) {
        const inner = tableToArgs(m[1]);
        return `[${inner}]`;
    }

    // filter "string"
    m = content.match(/^filter\s+"(.+)"$/);
    if (m) return `"${m[1]}"`;

    m = content.match(/^filter\s+'(.+)'$/);
    if (m) return `"${m[1]}"`;

    return `"${content.replace(/^filter\s+/, '')}"`;
}

// Convert a single-line Lua function call to TypeScript
// Returns converted string or null if it can't handle it
function convertCall(trimmed, prefix) {
    // funcname "string"
    let m = trimmed.match(/^(\w+)\s+"([^"]*)"$/);
    if (m) {
        const fn = nameMap[m[1].toLowerCase()] || m[1];
        return `${prefix}.${fn}("${m[2]}");`;
    }

    m = trimmed.match(/^(\w+)\s+'([^']*)'$/);
    if (m) {
        const fn = nameMap[m[1].toLowerCase()] || m[1];
        return `${prefix}.${fn}("${m[2]}");`;
    }

    // funcname (value) — number or expression
    m = trimmed.match(/^(\w+)\s*\((.+)\)$/);
    if (m) {
        const fn = nameMap[m[1].toLowerCase()] || m[1];
        return `${prefix}.${fn}(${convertString(m[2])});`;
    }

    // funcname { "a", "b" } — single-line table
    m = trimmed.match(/^(\w+)\s+(\{.*\})$/);
    if (m) {
        const fn = nameMap[m[1].toLowerCase()] || m[1];
        const args = tableToArgs(m[2]);
        // If it became an object (key-value), wrap in parens as single arg
        if (args.startsWith('{')) {
            return `${prefix}.${fn}(${args});`;
        }
        return `${prefix}.${fn}(${args});`;
    }

    // funcname "string" .. concat  — string concat expression
    m = trimmed.match(/^(\w+)\s+(.+\.\..+)$/);
    if (m) {
        const fn = nameMap[m[1].toLowerCase()] || m[1];
        return `${prefix}.${fn}(${convertString(m[2])});`;
    }

    return null;
}

// Scope pop rules: which existing scope types to close when a new creator appears
const POP_RULES = {
    workspace: ['workspace', 'project', 'group', 'rule', 'filter'],
    project:   ['project', 'filter'],
    group:     ['project', 'group', 'filter'],
    rule:      ['project', 'group', 'rule', 'filter'],
    filter:    ['filter'],
};

function convertCodeBlock(luaCode, item) {
    const lines = luaCode.split('\n');
    const out = [];

    // scopeStack: [{type, prefix, closing}]
    const scopeStack = [];

    function indent() { return '    '.repeat(scopeStack.length); }
    function currentPrefix() {
        if (scopeStack.length === 0) return 'p';
        return scopeStack[scopeStack.length - 1].prefix;
    }

    function popScopes(types) {
        while (scopeStack.length > 0 && types.includes(scopeStack[scopeStack.length - 1].type)) {
            const scope = scopeStack.pop();
            if (scope.closing) out.push('    '.repeat(scopeStack.length) + scope.closing);
        }
    }

    // Multiline table collection state
    let inTable = false;
    let tableLines = [];
    let tableFn = '';
    let tableIndent = '';
    let tablePrefix = '';
    let braceDepth = 0;

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        const trimmed = raw.trim();

        // Collect multiline table
        if (inTable) {
            tableLines.push(trimmed);
            braceDepth += (trimmed.match(/\{/g) || []).length;
            braceDepth -= (trimmed.match(/\}/g) || []).length;
            if (braceDepth <= 0) {
                // End of table — reconstruct and convert
                inTable = false;
                const joined = tableLines.join('\n');
                const firstBrace = joined.indexOf('{');
                const lastBrace = joined.lastIndexOf('}');
                const inner = joined.slice(firstBrace + 1, lastBrace).trim().replace(/,\s*$/, '');

                const isKV = /\[?"?\w+"?\]\s*=/.test(inner) || /^\s*\w+\s*=\s*[^=]/m.test(inner);
                if (isKV) {
                    const converted = inner
                        .replace(/\["(.+?)"\]\s*=\s*/g, '$1: ')
                        .replace(/\[(\d+)\]\s*=\s*/g, '$1: ')
                        .replace(/^(\w+)\s*=\s*/gm, '$1: ');
                    const innerLines = converted.split('\n').filter(l => l.trim());
                    out.push(`${tableIndent}${tablePrefix}.${tableFn}({`);
                    innerLines.forEach(l => out.push(`${tableIndent}    ${l.trim()}`));
                    out.push(`${tableIndent}});`);
                } else {
                    // Regular array table — spread as args
                    const args = inner.split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
                        .map(s => s.trim()).filter(s => s && s !== '');
                    if (args.length === 0) {
                        out.push(`${tableIndent}${tablePrefix}.${tableFn}();`);
                    } else if (args.join(', ').length < 80) {
                        out.push(`${tableIndent}${tablePrefix}.${tableFn}(${args.join(', ')});`);
                    } else {
                        out.push(`${tableIndent}${tablePrefix}.${tableFn}(`);
                        args.forEach((a, idx) => {
                            out.push(`${tableIndent}    ${a}${idx < args.length - 1 ? ',' : ''}`);
                        });
                        out.push(`${tableIndent});`);
                    }
                }
                tableLines = [];
                braceDepth = 0;
            }
            continue;
        }

        // Blank line
        if (trimmed === '') {
            out.push('');
            continue;
        }

        // Markdown reference links [n]: http://... — skip
        if (/^\[\d+\]:\s*http/.test(trimmed)) {
            continue;
        }

        // Lua comment
        if (trimmed.startsWith('--')) {
            out.push(indent() + '//' + trimmed.slice(2));
            continue;
        }

        // Strip inline Lua comment before further processing
        const stripped = stripLuaComment(trimmed);

        // Complex Lua — keep as comment
        if (isComplexLua(stripped)) {
            out.push(indent() + '// Lua: ' + trimmed);
            continue;
        }

        // `include "..."` — premake script inclusion, not in premake-ts
        if (/^include\s/.test(stripped)) {
            out.push(indent() + '// ' + stripped);
            continue;
        }

        // === Scope creators ===

        // workspace
        if (/^workspace\s/.test(stripped)) {
            popScopes(POP_RULES.workspace);
            const arg = extractDeclArg(stripped);
            out.push(indent() + `workspace(${arg}, (p) => {`);
            scopeStack.push({ type: 'workspace', prefix: 'p', closing: '});' });
            continue;
        }

        // project
        if (/^project\s/.test(stripped)) {
            popScopes(POP_RULES.project);
            const pfx = currentPrefix();
            const arg = extractDeclArg(stripped);
            out.push(indent() + `${pfx}.project(${arg}, (p) => {`);
            scopeStack.push({ type: 'project', prefix: 'p', closing: '});' });
            continue;
        }

        // group "" — end of group
        if (stripped === 'group ""' || stripped === "group ''") {
            popScopes(POP_RULES.group);
            continue;
        }

        // group "Name"
        if (/^group\s/.test(stripped)) {
            popScopes(POP_RULES.group);
            const pfx = currentPrefix();
            const arg = extractDeclArg(stripped);
            out.push(indent() + `${pfx}.group(${arg}, (p) => {`);
            scopeStack.push({ type: 'group', prefix: 'p', closing: '});' });
            continue;
        }

        // rule
        if (/^rule\s/.test(stripped)) {
            popScopes(POP_RULES.rule);
            const pfx = currentPrefix();
            const arg = extractDeclArg(stripped);
            out.push(indent() + `${pfx}.rule(${arg}, (r) => {`);
            scopeStack.push({ type: 'rule', prefix: 'r', closing: '});' });
            continue;
        }

        // filter {} — reset
        if (stripped === 'filter {}') {
            popScopes(POP_RULES.filter);
            // omit — in premake-ts the callback scope handles this
            continue;
        }

        // filter "..." or filter { "a", "b" }
        if (/^filter\s/.test(stripped)) {
            popScopes(POP_RULES.filter);
            const pfx = currentPrefix();
            const filterArg = extractFilterArg(stripped);
            out.push(indent() + `${pfx}.when(${filterArg}, (p) => {`);
            scopeStack.push({ type: 'filter', prefix: 'p', closing: '});' });
            continue;
        }

        // === Regular function calls ===

        const pfx = currentPrefix();

        // Start of multiline table: funcname {
        const mlMatch = stripped.match(/^(\w+)\s+(\{[^}]*)$/) || stripped.match(/^(\w+)\s*\(\s*(\{[^}]*)$/);
        if (mlMatch) {
            const tableStart = mlMatch[2];
            const opens = (tableStart.match(/\{/g) || []).length;
            const closes = (tableStart.match(/\}/g) || []).length;
            if (opens > closes) {
                inTable = true;
                tableFn = nameMap[mlMatch[1].toLowerCase()] || mlMatch[1];
                tableIndent = indent();
                tablePrefix = pfx;
                tableLines = [tableStart];
                braceDepth = opens - closes;
                continue;
            }
        }

        const converted = convertCall(stripped, pfx);
        if (converted) {
            out.push(indent() + converted);
        } else {
            // Unrecognized — emit as Lua comment
            out.push(indent() + '// Lua: ' + trimmed);
        }
    }

    // Close remaining open scopes
    while (scopeStack.length > 0) {
        const scope = scopeStack.pop();
        if (scope.closing) out.push('    '.repeat(scopeStack.length) + scope.closing);
    }

    return out.join('\n');
}

function convertExamples(examples, item) {
    if (!examples || !examples.trim()) return examples;

    return examples.replace(/```lua\n([\s\S]*?)```/g, (_match, code) => {
        try {
            const converted = convertCodeBlock(code, item);
            return '```typescript\n' + converted + '\n```';
        } catch (e) {
            console.warn(`  [WARN] Failed to convert ${item.name}: ${e.message}`);
            return _match;
        }
    });
}

let converted = 0;
const output = data.map(item => {
    const newExamples = convertExamples(item.examples, item);
    if (newExamples !== item.examples) converted++;
    return { ...item, examples: newExamples };
});

const outPath = path.join(dataDir, 'sanitized-typescript.json');
writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`Converted examples for ${converted}/${output.length} items → ${outPath}`);
