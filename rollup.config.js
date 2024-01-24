import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
    input: 'src/index.ts',
    strictDeprecations: true,
    plugins: [
        terser(),
        typescript()
    ],
    output: {
        file: pkg.module,
        format: 'esm',
        sourcemap: false
    }
})
