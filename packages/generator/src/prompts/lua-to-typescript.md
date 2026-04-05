Convert Premake Lua code examples to the premake-ts TypeScript API. Apply these rules:

**Function calls:**
- Lua: `funcname "value"` or `funcname { "a", "b" }` → TypeScript: `p.funcName("a", "b");`
- Function names become lowerCamelCase: `buildcommands` → `p.buildCommands`, `buildoptions` → `p.buildOptions`
- Lua tables used as list arguments become variadic args: `{ "a", "b" }` → `"a", "b"`

**Scoping blocks:**
- `workspace "Name"` → `workspace("Name", (p) => { ... });`
- `project "Name"` → `p.project("Name", (p) => { ... });`
- `group "Name"` → `p.group("Name", (p) => { ... });`
- Nested items inside a scope block go inside the callback

**Filters:**
- `filter "expr"` → `p.when("expr", (p) => { ... });`
- `filter { "a", "b" }` → `p.when(["a", "b"], (p) => { ... });`
- `filter {}` (reset) can be omitted — scoping handles it

**Key-value tables (objects):**
- Lua: `configmap { ["Key"] = "Value" }` → TypeScript: `p.configMap({ Key: "Value" });`
- Use quoted keys only when they contain special characters

**Comments:**
- `-- comment` → `// comment`

**Other:**
- Lua string concatenation `..` → TypeScript `+`
- Lua globals like `_ACTION` stay as-is
- Premake token strings like `%{cfg.buildcfg}` are passed through unchanged
- Keep all surrounding prose/explanation text exactly as-is, only convert code inside ```lua blocks to ```typescript blocks

Here are examples showing correct conversions:

---

**Example 1 — Simple function calls with list arguments**

Input:
Define two new symbols in the current project.

```lua
defines { "DEBUG", "TRACE" }
```

Symbols may also assign values.

```lua
defines { "CALLSPEC=__dllexport" }
```

Output:
Define two new symbols in the current project.

```typescript
p.defines("DEBUG", "TRACE");
```

Symbols may also assign values.

```typescript
p.defines("CALLSPEC=__dllexport");
```

---

**Example 2 — Workspace, project, and filter nesting**

Input:
Set the project to build a command-line executable.

```lua
kind "ConsoleApp"
```

Build either a static or a shared library, depending on the selected build configuration.

```lua
workspace "MyWorkspace"
   configurations { "DebugLib", "DebugDLL", "ReleaseLib", "ReleaseDLL" }

project "MyProject"

   filter "*Lib"
      kind "StaticLib"

   filter "*DLL"
      kind "SharedLib"
```

Output:
Set the project to build a command-line executable.

```typescript
p.kind("ConsoleApp");
```

Build either a static or a shared library, depending on the selected build configuration.

```typescript
workspace("MyWorkspace", (p) => {
    p.configurations("DebugLib", "DebugDLL", "ReleaseLib", "ReleaseDLL");

    p.project("MyProject", (p) => {
        p.when("*Lib", (p) => {
            p.kind("StaticLib");
        });
        p.when("*DLL", (p) => {
            p.kind("SharedLib");
        });
    });
});
```

---

**Example 3 — Key-value table arguments (objects)**

Input:
The workspace contains four build configurations, while the project contains only the standard Debug and Release.

```lua
workspace "MyWorkspace"
   configurations { "Debug", "Development", "Profile", "Release" }

project "MyProject"
   configmap {
      ["Development"] = "Debug",
      ["Profile"] = "Release",
   }
```

Output:
The workspace contains four build configurations, while the project contains only the standard Debug and Release.

```typescript
workspace("MyWorkspace", (p) => {
    p.configurations("Debug", "Development", "Profile", "Release");

    p.project("MyProject", (p) => {
        p.configMap({
            Development: "Debug",
            Profile: "Release"
        });
    });
});
```

---

**Example 4 — Filter with system conditions and file patterns**

Input:
Add files for specific systems; might not work with all exporters.

```lua
filter "system:Windows"
  files { "src/windows/*.h", "src/windows/*.cpp" }

filter "system:MacOSX"
  files { "src/mac/*.h", "src/mac/*.cpp" }
```

Output:
Add files for specific systems; might not work with all exporters.

```typescript
p.when("system:Windows", (p) => {
    p.files("src/windows/*.h", "src/windows/*.cpp");
});
p.when("system:MacOSX", (p) => {
    p.files("src/mac/*.h", "src/mac/*.cpp");
});
```

---

**Example 5 — Complex nesting with per-file build commands**

Input:
Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.

```lua
workspace "Workspace"
   configurations { "Debug", "Release" }

project "MyProject"
   kind "Makefile"

   buildcommands {
      "make %{cfg.buildcfg}"
   }

   cleancommands {
      "make clean %{cfg.buildcfg}"
   }
```

Output:
Use a [Makefile project](Makefile-Projects.md) to execute an external makefile.

```typescript
workspace("Workspace", (p) => {
    p.configurations("Debug", "Release");

    p.project("MyProject", (p) => {
        p.kind("Makefile");
        p.buildCommands("make %{cfg.buildcfg}");
        p.cleanCommands("make clean %{cfg.buildcfg}");
    });
});
```

---

Now convert the following Premake Lua examples to TypeScript. Output ONLY the converted text (prose + typescript code blocks), nothing else.

{{EXAMPLES}}