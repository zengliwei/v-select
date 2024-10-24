import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        cssCodeSplit: true,
        lib: {
            name: 'v3-select',
            entry: `src/components/v3-select.vue`,
            fileName: () => 'lib/v3-select.[format].js'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                inlineDynamicImports: false,
                globals: {vue: 'Vue'},
                assetFileNames: (info) => {
                    if (info.name.length - info.name.lastIndexOf('.css') === 4) {
                        return `lib/${info.name.substring(0, info.name.length - 4)}.min.css`;
                    }
                    return 'lib/[name].[ext]';
                }
            }
        }
    }
});
