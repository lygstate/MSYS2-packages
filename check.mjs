import * as fs from 'fs/promises'
import * as fsSync from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const portsDir = path.join(__dirname, 'ports');
    const dirs = await fs.readdir(portsDir);
    for (let dir of dirs) {
        const fullUrl = path.join(portsDir, dir, 'PKGBUILD');
        if (!fsSync.existsSync(fullUrl)) {
            console.log(`Invalid ${fullUrl}`)
        }
    }
    console.log(`All path checked`)
}

main()
