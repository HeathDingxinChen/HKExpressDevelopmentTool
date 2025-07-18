import {resolve} from "path";
import {defineConfig} from 'vite';
import {chromeExtension} from 'vite-plugin-chrome-extension';

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },

    plugins: [
        chromeExtension({
            contentScriptWrapper: true
        })
    ],
    build: {
        rollupOptions: {
            input: 'src/manifest.json'
        }
    }
})