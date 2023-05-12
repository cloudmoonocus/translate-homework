import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        vueI18n({
            include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/i18n/**'),
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        },
    },
    server: {
        host: '0.0.0.0',
        open: false,
    },
})
