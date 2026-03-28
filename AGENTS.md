# AGENTS.md

This document describes the project structure and conventions for AI agents working on this codebase.

## Repository Structure

This is an npm workspaces monorepo named `orb` with three packages under `packages/`:

```
packages/
├── premake-ts/              @orb/premake-ts         - CLI generator (user-facing)
├── premake-ts-generator/    @orb/premake-ts-generator - Parser/codegen pipeline
└── build/                   @orb/build              - Module-based build system
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

**Purpose:** Hierarchical module/dependency build system on top of premake-ts. Users write `orb.ts` files that define projects, packages, and modules; the system resolves dependencies, then generates premake-ts Lua.

### Key Files
- `src/main.ts` — CLI entry point: parse args → load project → resolve deps → generate Lua → run premake
- `src/index.ts` — Public API re-exports for user `orb.ts` files
- `src/cli/args.ts` — Commander-based CLI parser (generate, build, list, clean commands)
- `src/config/schema.ts` — Core TypeScript types (IProject, IPackage, IModule, ModuleScope, filter types, IConfigDefaults, BuildStrategy)
- `src/config/helpers.ts` — Factory functions: `defineProject`, `definePackage`, `defineLibrary`, `defineSharedLibrary`, `defineHeaderOnly`, `defineExecutable`, `defineWindowedApp`
- `src/config/loader.ts` — Discovers and loads `orb.ts`/`orb.package.ts`/`orb.module.ts` files, auto-wraps single modules/packages into projects
- `src/config/options.ts` — Zod-based options resolution (defaults → config file → CLI flags)
- `src/resolver/graph.ts` — Dependency graph builder: cycle detection (Kahn's algorithm), bare/qualified name resolution, reachability pruning (BFS from roots), `getTransitiveDeps()`
- `src/generator/premake.ts` — `ModuleScopeImpl` recorder + premake-ts code generation; replays scope operations into `PremakeScope` proxy
- `src/generator/filters.ts` — `not()`, `or()`, `compileFilter()` for premake filter expressions
- `src/utils/paths.ts` — `findProjectRoot()`, `resolvePath()`, `makeRelative()` path utilities
- `src/utils/logger.ts` — Colored console logging with level filtering (chalk)

### Exports
```
"."                          → src/index.ts (defineProject, definePackage, defineLibrary, ...)
"./config/schema"            → src/config/schema.ts (IProject, IModule, ModuleScope, ...)
"./config/helpers"           → src/config/helpers.ts (factory functions)
"./config/loader"            → src/config/loader.ts (loadProject)
"./config/options"           → src/config/options.ts (resolveOptions)
"./resolver"                 → src/resolver/graph.ts (buildDependencyGraph, getTransitiveDeps)
"./generator"                → src/generator/premake.ts (generatePremake)
"./generator/filters"        → src/generator/filters.ts (not, or, compileFilter)
```

### Architecture / Pipeline
1. **Load** — `loadProject(orbFile)` discovers and imports `orb.ts` files from disk, resolving package/module references by convention (`<name>/orb.ts`, `<name>.ts`, etc.)
2. **Resolve** — `buildDependencyGraph(project, options)` registers modules, resolves dependency names (bare → same-package → global), detects cycles via topological sort, marks root executables, and BFS-prunes unreachable modules
3. **Generate** — `generatePremake(opts)` creates a `PremakeScope`, emits workspace/configurations/defaults, then for each reachable module: records `ModuleScopeImpl` operations from user callbacks (`private`, `public`, `link`), resolves paths relative to workspace root, replays into the premake-ts proxy, auto-links libraries (skipping HeaderOnly), and emits MSVC runtime per-config
4. **Output** — `generate()` from `@orb/premake-ts/generator` serializes the scope tree to Lua; premake5 is invoked on the result

### Module System
Orb uses a tree of `orb.ts` files that define Projects, Packages, and Modules:
- **Project** (`defineProject`) — Top-level container with packages, config defaults, options, and build strategy
- **Package** (`definePackage`) — Container of modules (like a folder)
- **Module** (`defineLibrary`, `defineExecutable`, `defineHeaderOnly`, etc.) — Build target with public/private/link scope callbacks
- Dependencies are resolved by qualified name (`thirdparty/entt`) or bare name (auto-resolved within same package, then globally)
- Modules expose three scope callbacks: `public` (transitive), `private` (local), `link` (link-time settings)

### Dependencies
- `@orb/premake-ts` — PremakeScope proxy and Lua generation
- `commander` — CLI argument parsing
- `zod` — Option schema validation
- `glob` — File pattern matching
- `chalk` — Colored terminal output

## Dependency Graph

```
@orb/build → @orb/premake-ts
@orb/premake-ts-generator → (writes files into @orb/premake-ts, no runtime dependency)
```

`@orb/premake-ts` has **no dependencies** on other packages and should remain that way.

## Testing

**Framework:** [Vitest](https://vitest.dev/) v4 — config at `vitest.config.ts`, pattern `packages/*/tests/**/*.test.ts`.

### premake-ts tests (`packages/premake-ts/tests/`)
- `generator.test.ts` — Tests Lua generation from `PremakeScope` proxy: basic workspace, filter blocks, multiple projects, globals exposure
- `fixtures/basic/` — Minimal C++ source files (main.cpp, math.h, math.cpp)

### @orb/build tests (`packages/build/tests/`)
- `build.test.ts` — Tests the full loader → resolver → generator pipeline:
  - **loader**: discovers packages and modules from fixture orb.ts files
  - **resolver**: dependency resolution, reachability marking, topological ordering
  - **generator**: workspace/project Lua output, transitive public includes, auto-linking (skips HeaderOnly), configuration defaults, output location
- `fixtures/project/` — Self-contained test project with:
  - `orb.ts` — Project root (TestProject, Debug/Release, C++20)
  - `src/orb.ts` — Package with `core` (StaticLib) and `app` (ConsoleApp)
  - `thirdparty/orb.ts` — Package with `mocklib` (HeaderOnly)
  - Minimal C++ source files for each module

## Common Tasks

### Running tests
```bash
npm run vitest                             # Run all vitest tests (watch mode)
npx vitest run                             # Run all tests once
```

### Testing premake-ts end-to-end
```bash
npm test                                    # Runs premake-ts on test/premake5.ts
npm start -- --emitOnly --file=test/premake5.ts vs2022  # Generate Lua only
```

### Testing orb end-to-end
```bash
npm run orb-test -- vs2022                  # Generate VS2022 solution from test/orb.ts
npm run orb -- generate --file=test/orb.ts vs2022  # Equivalent explicit command
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
- Test files live in `packages/<pkg>/tests/` alongside a `fixtures/` directory
- User-facing orb.ts files import from `@orb/build` (or relative path during development)
