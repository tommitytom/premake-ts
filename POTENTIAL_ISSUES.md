# Potential Issues

Items that may need attention, observed during the monorepo restructuring.

## Cross-Package File Writes

The `@orb/premake-ts-generator` package writes files directly into `@orb/premake-ts`:
- `src/scopes/generated/*.generated.ts`
- `types/premake-ts.d.ts`
- `data/fields.json`

These paths are resolved using `__dirname`-relative joins (e.g., `join(__dirname, '..', '..', 'premake-ts', ...)`). This means the packages **must** remain siblings under `packages/`. If the directory layout changes, these paths will break silently.

## `sanitized.json` vs `fields.json` in @orb/build

The orb build system previously used `sanitized.json` (from the parser) for path resolution in `resolveScopePaths()`. This was changed to use `fields.json` (from `@orb/premake-ts`) to eliminate the cross-package dependency on the parser. Both files contain the `name` and `kind` fields used in the lookup. However, `sanitized.json` contains more entries (documented + LLM-processed fields) while `fields.json` is the raw Premake field dump. If a field exists in sanitized but not in fields, the path resolution would not apply for that field. In practice this is unlikely since all sanitized fields originate from fields.json.

## `// @ts-nocheck` in scopes.ts

`packages/premake-ts/src/scopes/scopes.ts` has `// @ts-nocheck` at the top. This suppresses all type checking in this file, which is the main scope type definition file. This was presumably added because the generated interface types create complex patterns that the TypeScript checker struggles with (possibly circular interface inheritance or complex generics). It would be worth investigating whether this can be removed or scoped more narrowly.

## Node.js Version Requirement

The project requires Node.js 23.6+ for `--experimental-strip-types`. This is not documented in `package.json` via an `engines` field. Users on older Node versions will get confusing errors. Consider adding:

```json
"engines": {
  "node": ">=23.6.0"
}
```

## Premake Binary Not Bundled

The `premake5` binary must be installed separately and available on PATH. There's no check or helpful error message if it's missing — users will see a raw spawn error. The `init` and `install-types` commands work without Premake, but any actual build action requires it.

## OpenAI Dependency Scope

The `openai` package is a runtime dependency of `@orb/premake-ts-generator`, but it's only used when running the LLM sanitization step (which targets a local server at `localhost:1234`). Since the parser only needs to be run when Premake documentation changes, this could be a `devDependency` or optional dependency instead.

## `--experimental-strip-types` Warning Suppression

The `--disable-warning=DEP0190` flag is used to suppress the deprecation warning for the experimental strip-types feature. As Node.js matures, this flag and `--experimental-strip-types` may no longer be needed (strip-types became stable in Node 24). The CLI scripts in `bin/` will need updating when that happens.

## Loader Resolution

The bin/loader.js resolves `import "premake-ts"` to the package's `src/index.ts`. This is necessary for user scripts that `import { workspace } from "premake-ts"`. If the module name changes (e.g., to `@orb/premake-ts`), the loader and all user-facing documentation would need updating.

## Test Fixtures in .gitignore

The `test/` directory is in `.gitignore`, which means test fixtures and example projects are not tracked by git. This is intentional for generated build outputs, but the TypeScript source files in `test/` (premake5.ts, orb.ts, etc.) may want to be tracked. Consider using more specific ignore patterns:

```
test/build/
test/*.sln
test/*.vcxproj
test/*.lua
```

## generate-lua.ts Output Path

The `generateLuaDefinitions()` function in the parser writes to a `premake-definitions/` directory within the generator package. This code path is currently commented out in main.ts. If re-enabled, verify the output path is correct.

## Orb Hard-codes `vs2022` Action

In `packages/build/src/main.ts`, the `dumpGlobals('vs2022')` call hard-codes the action to `vs2022`. This should be parsed from CLI arguments instead, similar to how the premake-ts generator handles it.
