import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const rootDir = dirname(
  fileURLToPath(new URL("../package.json", import.meta.url)),
);
const nodeType = "shadow-check";
const editorDir = join(rootDir, "src", "nodes", nodeType, `${nodeType}.html`);
const outputDir = join(rootDir, "dist", "nodes", nodeType);
const editorBundle = join(outputDir, `${nodeType}.editor.js`);
const outputFile = join(outputDir, `${nodeType}.html`);

await mkdir(outputDir, { recursive: true });

await build({
  entryPoints: [join(editorDir, "index.ts")],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2020",
  outfile: editorBundle,
  sourcemap: false,
});

const [editorCode, editorTemplate, helpTemplate] = await Promise.all([
  readFile(editorBundle, "utf8"),
  readFile(join(editorDir, "editor.html"), "utf8"),
  readFile(join(editorDir, "help.html"), "utf8"),
]);

const html = `<script type="text/javascript">\n${editorCode}\n</script>\n\n<script type="text/html" data-template-name="${nodeType}">\n${editorTemplate}\n</script>\n\n<script type="text/html" data-help-name="${nodeType}">\n${helpTemplate}\n</script>\n`;

await writeFile(outputFile, html);
await rm(editorBundle, { force: true });
