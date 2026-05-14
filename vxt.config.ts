import path from "node:path"
import pc from "picocolors"


type TPossibleModuleName = "service-worker" | "content" | "popup" | "options" | "side-panel"
type TExtensionModuleInputConfigItem = {
    module: TPossibleModuleName
    path: string
    enabled: boolean
}

const extensionModuleInputConfig: TExtensionModuleInputConfigItem[] = [
    {
        module: "service-worker",
        path: "src/background/service-worker.ts",
        enabled: true
    },
    {
        module: "content",
        path: "src/content-scripts/index.ts",
        enabled: true
    },
    {
        module: "popup",
        path: "src/popup/index.html",
        enabled: true
    },
    {
        module: "options",
        path: "src/options/index.html",
        enabled: true
    },
    {
        module: "side-panel",
        path: "src/side-panel/index.html",
        enabled: false
    }
]

export const ExtensionModulesConfig = {
    input() {
        console.log(pc.yellow("These modules are currently not enabled; set `enable: true` if you need them\n"))
        console.log(extensionModuleInputConfig.filter(item => !item.enabled).map(item => "* " + item.module).join("\n"))

        return extensionModuleInputConfig.reduce((config: { [index: string]: string }, item) => {
            if (item.enabled) {
                config[item.module] = path.resolve(__dirname, item.path)
            }
            return config
        }, {})
    }
}
