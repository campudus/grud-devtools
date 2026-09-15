import { build, emptyDir } from "jsr:@deno/dnt@^0.41.3";
import { parse as parseJsonc } from "jsr:@std/jsonc@^1.0.2";

// deno.jsonc has comments, so it can't go through a plain `type: "json"` import
// (Deno rejects that with "Expected a Json module, but identified a Jsonc module").
const denoConfig = parseJsonc(Deno.readTextFileSync("./deno.jsonc")) as { version: string };

// CLI arg wins when given (used for local/manual test builds, e.g. "0.3.7-dnt-test"),
// otherwise this mirrors exactly the version `deno publish` uses for the JSR release,
// so both registries stay in lockstep without a second place to bump the version.
const version = Deno.args[0] ?? denoConfig.version;

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
    // dnt does not read deno.jsonc's "imports" map on its own - every npm: specifier used in src/
    // (here just "ramda", matched to the version pinned in deno.jsonc) has to be declared again here,
    // or the generated package.json ships with no "dependencies" at all and every consumer's own
    // install silently fails to resolve it.
    dependencies: {
      ramda: "^0.30.1",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
