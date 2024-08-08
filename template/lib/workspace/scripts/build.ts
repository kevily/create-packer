import { Engine, rollup, tsc } from '1k-tasks'
import * as path from 'path'

async function build(lib: string) {
    const root = path.join(process.cwd(), 'packages', lib)
    const ignore = ['**/*.{dts,test,types}.ts', '**/*.stories.*']
    const workDir = 'src'
    const dest = 'dist'
    const task = new Engine()
    task.registry('rollup', rollup.buildReact, {
        root,
        workDir,
        input: '**/*.{ts,tsx}',
        outputDir: dest,
        ignore
    })
    task.registry('tsc', tsc, { root })
    task.run({ tip: `buliding ${lib}...` })
}

build('ts')
build('react')
