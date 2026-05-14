import path from "node:path"
import {fileURLToPath} from "node:url";

console.log(path.dirname(fileURLToPath(import.meta.url)))