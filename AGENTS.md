# AGENTS.md

This document describes the project structure and conventions for AI agents working on this codebase.

## Repository Structure

This is an npm workspaces monorepo named `orb` with three packages under `packages/`:

```
packages/
├── premake-ts/              @orb/premake-ts         - CLI generator (user-facing)
├── premake-ts-generator/    @orb/premake-ts-generator - Parser/codegen pipeline
└── build/                   @orb/build              - Module-based build system (prototype)
```

## Runtime Environment

- **Node.js 23.6+** with `--experimental-strip-types` — TypeScript is executed directly, no compilation step
- **All imports use `.ts` extensions** in internal code (required by Node strip-types)
- **Cross-package imports** use npm workspace package names (e.g., `@orb/premake-ts/generator`)
- **Do NOT introduce ts-node, tsx, or any TypeScript compiler in the runtime pipeline**
- JSON imports require `with { type: "json" }` assertion

## Package: @orb/premake-ts

**Purpose:** The user-facing CLI tool. Reads `.ts` build scripts, generates Lua, and invokes Premake.

### Key Files
- `bin/cli.js` — CLI entry point, sets up Node with strip-types and the module loader
- `bin/loader.js` — Module resolution hook that maps `"premake-ts"` → `src/index.ts`
- `bin/register-loader.js` — Registers the loader at startup
- `src/main.ts` — Main orchestrator: parse args → import user script → generate Lua → run premake
- `src/generator.ts` — Converts PremakeScope commands to formatted Lua
- `src/cli-args.ts` — CLI argument parser
- `src/init.ts` — Interactive project initialization wizard
- `src/index.ts` — Public API (`workspace()`, `os` utilities)
- `src/util.ts` — `execPremake()` and `dumpGlobals()` utilities
- `src/scopes/PremakeScope.ts` — Core class with Proxy-based dynamic API
- `src/scopes/scopes.ts` — TypeScript interface definitions for scope hierarchy
- `src/scopes/generated/` — Auto-generated interface stubs (output from parser)
- `data/fields.json` — Runtime field metadata (copied from parser)
- `types/premake-ts.d.ts` — Bundled type declarations for user projects
- `types/tsconfig.json` — User-facing tsconfig (copied during `install-types`)

### Exports
```
"."                          → src/index.ts (workspace, os)
"./generator"                → src/generator.ts (generate)
"./util"                     → src/util.ts (execPremake, dumpGlobals)
"./scopes"                   → src/scopes/scopes.ts (scope types, KindType)
"./scopes/PremakeScope"      → src/scopes/PremakeScope.ts (PremakeScope class)
"./data/fields.json"         → data/fields.json (runtime field lookup)
```

### Architecture Pattern
User code flows through a **Proxy pattern**: `PremakeScope.createProxy<T>()` creates a proxy that intercepts all property access. Method calls on scope objects (like `p.kind("ConsoleApp")`) are captured as `{ name, args }` command objects. The proxy uses `fields.json` at runtime to determine whether a field accepts a single value or a list.

## Package: @orb/premake-ts-generator

**Purpose:** Extracts Premake metadata, processes documentation with LLMs, and generates TypeScript types.

### Key Files
- `src/main.ts` — Pipeline orchestrator
- `src/load.ts` — JSON data persistence (reads/writes from `src/data/`)
- `src/documentation.ts` — Markdown documentation extractor (reads from `src/docs/`)
- `src/sanitize.ts` — LLM-based documentation normalization
- `src/llm.ts` — OpenAI API wrapper (supports local LLM endpoints)
- `src/generate-ts.ts` — Generates scope interface stubs → writes to `@orb/premake-ts/src/scopes/generated/`
- `src/generate-lua.ts` — Generates Lua definition stubs (currently disabled)
- `src/bundle-types.ts` — Bundles TypeScript declarations → writes to `@orb/premake-ts/types/`
- `src/tsconfig.declarations.json` — TypeScript config for .d.ts emission
- `src/dump-fields.lua` — Premake introspection script
- `src/data/` — JSON data files (fields, documented, sanitized, global-docs)
- `src/docs/` — Premake markdown documentation (source for extraction)
- `src/prompts/` — LLM prompt templates

### Output Targets (cross-package writes)
The parser generates files directly into `@orb/premake-ts`:
- `packages/premake-ts/src/scopes/generated/*.generated.ts` — Scope interfaces
- `packages/premake-ts/types/premake-ts.d.ts` — Bundled type declarations
- `packages/premake-ts/data/fields.json` — Runtime field data (copied from local data)

### Pipeline
1. Run `dump-fields.lua` via Premake → extract field metadata → `data/fields.json`
2. Extract documentation from markdown → `data/documented.json`
3. Sanitize with LLM → `data/sanitized.json`
4. Generate TypeScript interfaces → `@orb/premake-ts/src/scopes/generated/`
5. Bundle declarations → `@orb/premake-ts/types/premake-ts.d.ts`
6. Copy `fields.json` → `@orb/premake-ts/data/fields.json`

## Package: @orb/build

**Purpose:** Prototype hierarchical module/dependency build system on top of premake-ts.

### Key Files
- `src/main.ts` — Module collector, dependency resolver, workspace flattener
- `src/types.ts` — Module/Package type definitions and factory functions

### Module System
Orb uses a tree of `orb.ts` files (or `{name}.ts`) that define Packages and Modules:
- **Package** — Container of other packages/modules (like a folder)
- **Module** — Build target (StaticLib, ConsoleApp, etc.) with public/private/link scopes
- Dependencies are resolved by full path (e.g., `thirdparty/entt`)
- Modules expose three scope callbacks: `public`, `private`, `link`

### Status
This package is in **prototype state**. It builds correctly but is not feature-complete. Do not add new features unless explicitly requested.

## Dependency Graph

```
@orb/build → @orb/premake-ts
@orb/premake-ts-generator → (writes files into @orb/premake-ts, no runtime dependency)
```

`@orb/premake-ts` has **no dependencies** on other packages and should remain that way.

## Common Tasks

### Testing the generator
```bash
npm test                                    # Runs premake-ts on test/premake5.ts
npm start -- --emitOnly --file=test/premake5.ts vs2022  # Generate Lua only
```

### Testing orb
```bash
cd test && node --experimental-strip-types --disable-warning=DEP0190 ../packages/build/src/main.ts --file=orb.ts
```

### Regenerating types
```bash
npm run parse   # Requires premake5 binary and local LLM server
```

## Conventions

- All TypeScript source uses `.ts` extension in imports
- ESM modules only (`"type": "module"` in all package.json)
- `__dirname` is derived from `import.meta.url` using `fileURLToPath`
- Generated files are committed to the repo (scopes/generated/, data/, types/)
- The `// @ts-nocheck` in scopes.ts exists because generated types may have complex patterns
