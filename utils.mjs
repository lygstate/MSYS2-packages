import { spawn } from "child_process";

export const black_list = new Set([
  // "ca-certificates",
  "cmake-bootstrap", // cmake-emacs-4.2.1-1 and cmake-bootstrap-4.2.1-1 are in conflict.
  "mingw-w64-cross-clang", // mingw-w64-cross-clang: /opt/i686-w64-mingw32/bin/ar exists in filesystem
  "mingw-w64-cross-clang-crt",
  "mingw-w64-cross-clang-headers",
  "msys2-runtime-3.3",
  "msys2-runtime-3.3-devel",
  "msys2-runtime-3.4",
  "msys2-runtime-3.4-devel",
  "msys2-runtime-3.5",
  "msys2-runtime-3.5-devel",
  "parallel", // parallel: /usr/bin/parallel exists in filesystem /usr/bin/parallel.exe is owned by moreutils 0.70-1
  "gnu-netcat", // gnu-netcat-0.7.1-3 and openbsd-netcat-1.234_1-1 are in conflict. Remove openbsd-netcat? [Y/n] "
]);

export function spawnProcessAsyncCapture(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    // Collect stdout and stderr data
    let stdoutOutput = "";
    let stderrOutput = "";

    const child = spawn(command, args, options);

    // Capture stdout data chunks
    child.stdout.on("data", (data) => {
      stdoutOutput += data.toString();
    });

    // Capture stderr data chunks
    child.stderr.on("data", (data) => {
      stderrOutput += data.toString();
    });

    // Handle process errors (e.g., command not found)
    child.on("error", (err) => {
      reject(err);
    });

    // Handle process exit
    child.on("close", (code) => {
      if (code !== 0) {
        // Reject the promise if the process fails (non-zero exit code)
        reject(new Error(`Process exited with code ${code}: ${stderrOutput}`));
      } else {
        // Resolve the promise with the captured output
        resolve({ stdout: stdoutOutput, stderr: stderrOutput, code });
      }
    });
  });
}

export function spawnProcessAsync(command, args = [], options = {}) {
  let p = spawn(command, args, options);
  return new Promise((resolve) => {
    p.stdout.pipe(process.stdout);
    p.stderr.pipe(process.stderr);
    p.on("exit", (code) => {
      resolve(code);
    });
  });
}
