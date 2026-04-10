# premake-ts

Write [Premake](https://premake.github.io/) build scripts in TypeScript with full type safety and editor completion.

## Packages

| Package | Description |
|---------|-------------|
| [`premake-ts`](packages/cli) | CLI tool that transpiles TypeScript build scripts to Lua and runs Premake |
| [`@premake-ts/generator`](packages/generator) | Internal parser and codegen pipeline that extracts Premake metadata and generates type definitions |

## Requirements

- **Node.js 22.6+** (uses `--experimental-strip-types` for native TypeScript execution)
- **Premake 5** binary on your PATH (for generating project files)

> **Note:** This project does **not** use ts-node, tsx, or any TypeScript compilation step. It relies on Node.js native type stripping.

## Quick Start

### Install

```bash
npm install -g premake-ts
```

Or run directly with npx:

```bash
npx premake-ts <action>
```

### Initialize a project

```bash
premake-ts init
```

This creates a `premake5.ts` file and installs type definitions (`premake-ts.d.ts` and `tsconfig.json`) in your project directory.

### Write your build script

```typescript
import { workspace } from "premake-ts";

export default workspace("MyWorkspace", (w) => {
  w.configurations("Debug", "Release");

  w.project("MyProject", (p) => {
    p.kind("ConsoleApp");
    p.language("C++");
    p.cppDialect("C++20");
    p.files("**.h", "**.cpp");

    p.when("configurations:Debug", (p) => {
      p.defines("DEBUG");
      p.symbols("On");
    });

    p.when("configurations:Release", (p) => {
      p.defines("NDEBUG");
      p.optimize("On");
    });
  });
});
```

### Generate project files

```bash
premake-ts vs2022
premake-ts xcode
premake-ts gmake
```

## Installing Type Definitions

Type definitions are versioned against specific Premake releases. You can install types matching your Premake version:

### TypeScript types

```bash
premake-ts install-types                        # latest stable
premake-ts install-types --version=5.0.0-beta8  # specific release
premake-ts install-types --version=dev           # latest dev build
```

Installs `premake-ts.d.ts` and `tsconfig.json` to your project root, giving you full autocomplete and type checking in your `premake5.ts` scripts.

### Lua types (LuaLS addon)

```bash
premake-ts install-lua-types                        # latest stable
premake-ts install-lua-types --version=5.0.0-beta8  # specific release
```

Installs Lua type annotations to `.premake-ts/lua-types/` for use with the [Lua Language Server](https://github.com/LuaLS/lua-language-server). Add this to your `.luarc.json`:

```json
{
  "workspace.library": [".premake-ts/lua-types/lua/library"]
}
```

## CLI Reference

```
Usage: premake-ts [options] <command|action>

Commands:
  init                 Initialize a new premake-ts project interactively
  install-types        Install TypeScript type definitions for a specific Premake version
  install-lua-types    Install Lua type definitions for Premake (LuaLS addon)
  help                 Display help information
  <action>             Run premake with the specified action (e.g., vs2022, xcode, gmake)

Options:
  --file=<path>            Path to the premake5.ts file (default: premake5.ts)
  --emitOnly               Only generate the Lua file without running premake
  --premakeBinary=<path>   Path to a custom premake5 binary (default: premake5)
  --keepIntermediate       Keep the generated premake5.lua file after execution
  --version=<version>      Premake version for install-types/install-lua-types
```

## Development

### Setup

```bash
git clone https://github.com/tommitytom/premake-ts
cd premake-ts
npm install
```

### Scripts

```bash
# Run premake-ts on the test project
npm test

# Run the parser/codegen pipeline (regenerate types from Premake metadata)
npm run parse

# Run all unit tests
npm run vitest
```

### How It Works

1. **premake-ts** reads your `.ts` build script and executes it in a scoped environment
2. Function calls (like `p.kind("ConsoleApp")`) are captured as commands via a Proxy
3. Commands are serialized to Lua and written to a temporary `.lua` file
4. The Premake binary is invoked with the generated Lua
5. The intermediate file is cleaned up (unless `--keepIntermediate`)

### Type Generation

Type definitions are generated from Premake source metadata and hosted in the [premake-types](https://github.com/tommitytom/premake-types) repository. A GitHub Action watches [premake-core](https://github.com/premake/premake-core) for new commits and releases, runs the generator pipeline, and creates PRs with updated types when changes are detected.

The generator pipeline (`npm run parse`) extracts field metadata from Premake, processes documentation, and generates both TypeScript and Lua type definitions. It requires:

- Premake 5 binary available
- An LLM endpoint (for documentation sanitization)

## License

MIT
