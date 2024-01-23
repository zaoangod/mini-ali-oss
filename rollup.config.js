import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
    input: 'src/index.ts',
    strictDeprecations: true,
    plugins: [typescript()],
    output: {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
    }
})
