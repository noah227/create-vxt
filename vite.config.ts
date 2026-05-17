import {fileURLToPath, URL} from 'node:url'
import {defineConfig, normalizePath} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from "node:path"
import {viteStaticCopy} from 'vite-plugin-static-copy'


// https://vite.dev/config/
export default defineConfig({
    build: {
        // https://rolldown.rs/reference/
        rolldownOptions: {
            input: {
                "service-worker": path.resolve(__dirname, "src/background/service-worker.ts"),
                content: path.resolve(__dirname, "src/content-scripts/index.ts"),
                popup: path.resolve(__dirname, "src/popup/index.html"),
                options: path.resolve(__dirname, "src/options/index.html"),
                "side-panel": path.resolve(__dirname, "src/side-panel/index.html"),
            },
            output: {
                entryFileNames: "js/[name].js",
                cleanDir: true
            }
        }
    },
    plugins: [
        vue(),
        vueDevTools(),
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(path.resolve(__dirname, "src/_locales")),
                    dest: "_locales",
                    rename: {stripBase: 2}
                },
                {
                    src: normalizePath(path.resolve(__dirname, "src/manifest.json")),
                    dest: ".",
                    rename: {stripBase: true}
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
