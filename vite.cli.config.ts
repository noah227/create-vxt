import {defineConfig} from 'rolldown'


export default defineConfig({
    input: "cli/index.ts",
    output: {
        format: "esm",
        dir: "cli-dist",
        cleanDir: true
    },
    platform: "node"
})
