import fs from "node:fs";
import path from "node:path";
import {cliRoot} from "./utils";
import {templateFiles} from "./files";


const includeFiles = () => {
    const pkgPath = path.resolve(cliRoot, "package.json")
    const pkg: { [index: string]: any } = JSON.parse(
        fs.readFileSync(pkgPath, {encoding: "utf8"})
    )

    pkg.files = [
        ...templateFiles,
        // cli files
        "cli-dist",
        "package.json",
        "README.md",
        "README.template.md"
    ]

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4), {encoding: "utf8"})

    checkFiles(pkg.files)
}

const checkFiles = (files: string[]) => {
    const allFiles = fs.readdirSync(cliRoot)
    console.log(`Include Files: All ${allFiles.length} files found at root, ${files.length} files included.`)
    console.log("These files are not included: ")
    console.log(allFiles.filter(item => !files.includes(item)).join("\n"))
}

includeFiles()