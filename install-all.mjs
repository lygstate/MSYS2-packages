import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import process from "node:process";
import { black_list, spawnProcessAsync } from "./utils.mjs";

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
  for (let pkg of packages.trim().split("\n")) {
    const pkg_name = pkg.split(" ")[1];
    if (black_list.has(pkg_name)) continue;
    if (need_exit) {
      break;
    }
    console.log(`Installing ${pkg_name}`);
    await spawnProcessAsync(`C:/CI-Tools/msys64/usr/bin/bash.exe`, [
      "--login",
      "-c",
      `pacman -S ${pkg_name} --noconfirm --needed`,
    ]);
  }
}

main();
