import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import process from "node:process";
import { black_list, spawnProcessAsyncCapture } from "./utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let need_exit = false;
process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  need_exit = true;
});

async function main() {
  const msys_packages = path.join(__dirname, "msys.txt");
  const packages = await fs.readFile(msys_packages, "utf-8");
  const deps_map = {};
  for (let pkg of packages.trim().split("\n")) {
    const pkg_name = pkg.split(" ")[1];
    if (black_list.has(pkg_name)) continue;
    if (need_exit) {
      break;
    }
    const deps = await spawnProcessAsyncCapture(
      `C:/CI-Tools/msys64/usr/bin/pactree.exe`,
      [pkg_name, "-u", "-d", "1"]
    );
    console.log(`Deps for ${pkg_name} is :[\n${deps.stdout}\n]`);
    deps_map[pkg_name] = deps.stdout.trim().split("\n");
  }
  fs.writeFile("deps.json", JSON.stringify(deps_map, null, 2));
}

main();
