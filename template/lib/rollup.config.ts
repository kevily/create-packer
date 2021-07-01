import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    plugins: [typescript({ useTsconfigDeclarationDir: true })]
})
