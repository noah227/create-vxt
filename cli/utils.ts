import {TUserInput} from "./types";
import fs from "node:fs"
import path from "node:path";
import {fileURLToPath} from "node:url";
import pkg from "../package.json"
import {templateFiles} from "./files";

export const emptyDir = (dirFullPath: string) => {
    if (!fs.existsSync(dirFullPath)) return
    // todo: may be too slow?
    fs.rmSync(dirFullPath, {recursive: true})
}

export const ableToUseDir = (userInput: TUserInput) => {
    const {appFullPath} = userInput
    if (!fs.existsSync(appFullPath)) return true
    // exists
    // but not dir
    if (fs.statSync(appFullPath).isFile()) return false
    // is empty dir
    return fs.readdirSync(appFullPath).length === 0
}

/**
 * Root of the cli project.
 */
export const cliRoot = path.dirname(
    path.dirname(fileURLToPath(import.meta.url))
)

export const copyFiles = (userInput: TUserInput) => {
    const {appFullPath} = userInput
    templateFiles.forEach(entry => {
        fs.cpSync(
            path.resolve(cliRoot, entry),
            path.resolve(appFullPath, entry),
            {recursive: true}
        )
    })
    initPackageJson(userInput)
    initReadme(userInput)
    initGitignore(userInput)
}

const cliOnlyScripts = ["build-cli", "include-files"]
const cliOnlyDevDeps = ["@clack/prompts", "picocolors", "tsx"]
const initPackageJson = ({appFullPath, appName}: TUserInput) => {
    const {
        scripts,
        dependencies,
        devDependencies,
        engines
    } = pkg

    // scripts
    const extensionScripts = pickOnExclusions(scripts, cliOnlyScripts)
    // dependencies
    const extensionDependencies = dependencies
    const extensionDevDependencies = pickOnExclusions(devDependencies, cliOnlyDevDeps)

    const extensionPkgContent = {
        name: appName,
        version: "0.0.0",
        private: true,
        type: "module",
        scripts: {...extensionScripts},
        dependencies: {...extensionDependencies},
        devDependencies: {...extensionDevDependencies},
        engines
    }

    fs.writeFileSync(
        path.resolve(appFullPath, "package.json"),
        JSON.stringify(extensionPkgContent, null, 4),
        {encoding: "utf8"}
    )
}

const pickOnExclusions = (o: object, exclusions: string[]) => {
    const data: { [index: string]: string } = {}
    Object.entries(o).forEach(([k, v]) => {
        if (!exclusions.includes(k)) data[k] = v
    })
    return data
}

const initReadme = ({appFullPath, appName}: TUserInput) => {
    const readMeTemplate = fs.readFileSync(
        path.resolve(cliRoot, "README.template.md"),
        {encoding: "utf8"}
    )
    const readmeContent = readMeTemplate.replace(`# ${pkg.name}`, `# ${appName}`)
    fs.writeFileSync(
        path.resolve(appFullPath, "README.md"),
        readmeContent,
        {encoding: "utf8"}
    )
}

const initGitignore = ({appFullPath}: TUserInput) => {
    fs.cpSync(
        path.resolve(cliRoot, "_gitignore"),
        path.resolve(appFullPath, ".gitignore")
    )
}