# orb

A monorepo containing tools for writing [Premake](https://premake.github.io/) build scripts in TypeScript, with full type safety and editor completion.

## Packages

| Package | Description |
|---------|-------------|
| [`@orb/premake-ts`](packages/premake-ts) | CLI tool that transpiles TypeScript build scripts to Lua and runs Premake |
| [`@orb/premake-ts-generator`](packages/premake-ts-generator) | Parser and codegen pipeline that extracts Premake metadata and generates TypeScript type definitions |
| [`@orb/build`](packages/build) | Hierarchical module-based build system built on top of premake-ts |

## Requirements

- **Node.js 23.6+** (uses `--experimental-strip-types` for native TypeScript execution)
- **Premake 5** binary on your PATH (for generating project files)

> **Note:** This project does **not** use ts-node, tsx, or any TypeScript compilation step. It relies on Node.js native type stripping.

## Quick Start

### Install

```bash
npm install -g @orb/premake-ts
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

## CLI Reference

```
Usage: premake-ts [options] <command|action>

Commands:
  init                 Initialize a new premake-ts project interactively
  install-types        Install TypeScript type definitions
  help                 Display help information
  <action>             Run premake with the specified action (e.g., vs2022, xcode, gmake)

Options:
  --file=<path>            Path to the premake5.ts file (default: premake5.ts)
  --emitOnly               Only generate the Lua file without running premake
  --premakeBinary=<path>   Path to a custom premake5 binary (default: premake5)
  --keepIntermediate       Keep the generated premake5.lua file after execution
```

## Development

### Setup

```bash
git clone <repo-url>
cd orb
npm install
```

### Scripts

```bash
# Run premake-ts on the test project
npm test

# Run the parser/codegen pipeline (regenerate types from Premake metadata)
npm run parse

# Run the orb build system on the test project
npm run orb-test -- vs2022

# Run all unit tests
npm run vitest

# Run all unit tests once (CI mode)
npx vitest run
```

### How It Works

1. **premake-ts** reads your `.ts` build script and executes it in a scoped environment
2. Function calls (like `p.kind("ConsoleApp")`) are captured as commands via a Proxy
3. Commands are serialized to Lua and written to a temporary `.lua` file
4. The Premake binary is invoked with the generated Lua
5. The intermediate file is cleaned up (unless `--keepIntermediate`)

### Regenerating Types

The parser pipeline (`npm run parse`) extracts field metadata from Premake, processes documentation, and generates TypeScript interfaces. It requires:

- Premake 5 binary available
- A local LLM server at `http://localhost:1234/v1` (for documentation sanitization)

The generated outputs are committed to the repo, so the parser only needs to be re-run when Premake or its documentation changes.

## Orb Build System

The `@orb/build` package provides a higher-level, module-based build system on top of premake-ts. Instead of writing Premake Lua-style scripts directly, you define projects, packages, and modules using a structured API.

### Project structure

```
my-project/
├── orb.ts                  # Project root (defineProject)
├── src/
│   ├── orb.ts              # Package (definePackage)
│   ├── core/
│   │   └── orb.ts          # Module (defineLibrary)
│   └── app/
│       └── orb.ts          # Module (defineExecutable)
└── thirdparty/
    ├── orb.ts              # Package (definePackage)
    └── entt.ts             # Module (defineHeaderOnly)
```

### Example

**orb.ts** (project root):
```typescript
import { defineProject } from "@orb/build";

export default defineProject({
  name: "MyProject",
  packages: ["src", "thirdparty"],
  defaults: {
    configurations: ["Debug", "Release"],
    cppDialect: "C++20",
    characterSet: "Unicode",
    configurationDefaults: {
      Debug: (ctx) => {
        ctx.symbols("On");
        ctx.optimize("Debug");
        ctx.defines("DEBUG");
      },
      Release: (ctx) => {
        ctx.symbols("On");
        ctx.optimize("Full");
        ctx.defines("NDEBUG");
      },
    },
  },
});
```

**src/core/orb.ts** (library module):
```typescript
import { defineLibrary } from "@orb/build";

export default defineLibrary({
  name: "core",
  dependencies: ["thirdparty/entt"],
  private(ctx) {
    ctx.files("*.cpp", "*.h");
  },
  public(ctx) {
    ctx.includeDirs(".");
  },
});
```

### Generate project files

```bash
orb generate vs2022
orb generate gmake2
```

### Key features

- **Automatic dependency resolution** — bare names resolve within the same package, then globally
- **Transitive public includes** — public scope settings propagate to dependents
- **Auto-linking** — libraries are automatically linked (HeaderOnly modules are skipped)
- **Cycle detection** — topological sort catches dependency cycles
- **Reachability pruning** — only modules reachable from an executable are emitted
- **Per-config MSVC runtime** — Debug/Release runtime settings are emitted automatically

## License

MIT
