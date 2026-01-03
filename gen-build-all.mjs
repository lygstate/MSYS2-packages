import * as fs from "fs/promises";
import * as fsSync from "fs";
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

let devel_black_list = [
  "gcc-libs",
  "gcc",
  "msys2-runtime",
  "msys2-runtime-devel",
  "binutils",
  "make",
  "ninja",
  "cmake",
  "autotools",

  "libiconv",
  "libiconv-devel",
  "iconv",

  "libxml2",
  "libxml2-devel",

  "libxcrypt-devel", // "libxcrypt-devel","perl"

  "doxygen", // ["doxygen","python"]

  "git", // ["git","libcurl-devel","rust"]
  "mingw-w64-cross-gcc",
  "mingw-w64-cross-mingwarm64-gcc",
];

function dump_deps(deps_map) {
  // console.log(deps_map);
  let keys_count = -1;

  // gettext-devel

  for (;;) {
    let keys = Object.keys(deps_map);
    if (keys.length == keys_count) {
      break;
    }
    keys_count = keys.length;
    if (keys.length == 0) {
      break;
    }
    for (let key of keys) {
      if (deps_map[key].length == 1) {
        console.log(key);
        delete deps_map[key];
      }
    }
    keys = Object.keys(deps_map);
    for (let key of keys) {
      let items = deps_map[key];
      items = items.filter((element) => {
        let item = element.split("=")[0];
        if (Object.hasOwn(deps_map, item)) {
          return true;
        }
      });
      deps_map[key] = items;
    }
  }

  let final_keys = Object.keys(deps_map);
  console.log(`Circular map ${final_keys.length}`);
  for (let key of final_keys) {
    console.log(JSON.stringify(deps_map[key]));
  }
}

async function main() {
  const deps_json_filepath = path.join(__dirname, "deps.json");
  const deps_json = JSON.parse(await fs.readFile(deps_json_filepath, "utf-8"));
  // dump_deps(deps_json.deps_map);
  const deps_map_make = {};
  for (let pkg of deps_json.pkg_info) {
    for (let pkgname of pkg.pkgname.split(" ")) {
      if (pkg.makedepends.length > 0) {
        let items = pkg.makedepends.split(" ")
        deps_map_make[pkgname] = [].concat(
          [pkgname],
          items.filter((item)=>{
            return item != pkgname
          })
        );
      } else {
        deps_map_make[pkgname] = [pkgname];
      }
      console.log(deps_map_make[pkgname]);
    }
  }

  for (let item of devel_black_list) {
    deps_map_make[item] = [item];
  }
  dump_deps(deps_map_make);
}

main();
