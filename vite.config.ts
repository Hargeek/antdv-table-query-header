import {defineConfig} from 'vite';
import eslint from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'AntdvQueryHeader',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['vue', 'ant-design-vue'],
            output: {
                globals: {
                    vue: 'Vue',
                    'ant-design-vue': 'AntDesignVue',
                },
            },
        },
    },
    plugins: [
        eslint({
            cache: false,
            include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
            exclude: ['node_modules'],
        }),
        dts(),
    ],
});
