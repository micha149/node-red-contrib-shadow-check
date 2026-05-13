import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(
  fileURLToPath(new URL("../package.json", import.meta.url)),
);

const copy = async (source, target) => {
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
};

await copy(
  join(rootDir, "src", "nodes", "shadow-check", "icons", "sunInWindow.png"),
  join(rootDir, "dist", "nodes", "shadow-check", "icons", "sunInWindow.png"),
);
