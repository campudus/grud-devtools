import { build, emptyDir } from "jsr:@deno/dnt@^0.41.3";

const version = Deno.args[0] ?? "0.0.0-local";

await emptyDir("./npm");

await build({
  entryPoints: [
    "./mod.ts",
    { name: "./types", path: "./src/types/index.ts" },
    { name: "./predicates", path: "./src/predicates.ts" },
    { name: "./intl", path: "./src/grud-intl.ts" },
    { name: "./getDisplayValue", path: "./src/getDisplayValue.ts" },
  ],
  outDir: "./npm",
  shims: {
    // No Deno-namespace APIs are used in src/ - only ramda and Intl, both of
    // which already run under Node - so no runtime shim is needed.
    deno: false,
  },
  test: false,
  package: {
    // Keeps the npm package name importers already use (import ... from "grud-devtools"),
    // independent of the JSR scope (@grud/devtools).
    name: "grud-devtools",
    version,
    description: "Shared GRUD domain helpers (column/cell types, display formatting, predicates)",
    license: "Apache-2.0",
    repository: {
      type: "git",
      url: "git+https://github.com/campudus/grud-devtools.git",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
