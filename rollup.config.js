const { defineConfig } = require('rollup')
const { default: typescript } = require('@rollup/plugin-typescript')

module.exports = defineConfig({
    input: 'src/index.ts',
    plugins: [typescript()],
    output: [
        {
            file: 'dist/bundle.js',
            format: 'umd',
            sourcemap: false,
            name: 'md5',
        },
        {
            file: 'dist/bundle.mjs',
            format: 'esm',
            sourcemap: false,
        },
    ],
})
