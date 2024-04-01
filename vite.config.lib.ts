import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dtsPlugin from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dtsPlugin({ include: ['lib'] })
    ],
    build: {
        copyPublicDir: false,
        sourcemap: true,
        lib: {
            entry: {
                'react-select/main.js': './lib/react-select/main.ts',
            },
            name: 'useSimilaritySelect',
            fileName: 'use-similarity-select',
            formats: ['es']
        },
        rollupOptions: {
            external: ['react'],
            output: {
                entryFileNames: '[name].js',
            }
        }
    }
})
