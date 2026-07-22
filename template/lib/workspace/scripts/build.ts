import path from 'node:path'
import ora from 'ora'
import chalk from 'chalk'
import * as tsdown from 'tsdown'

async function build(lib: string) {
    const task = ora().start(chalk.yellow(`buliding ${lib}...\n`))
    try {
        await tsdown.build({
            cwd: path.join(process.cwd(), 'packages', lib),
            entry: ['src/index.ts'],
            format: ['esm'],
            outDir: 'dist',
            target: ['chrome109', 'edge109', 'firefox114', 'safari16.4'],
            platform: 'browser',
            dts: true,
            unbundle: true,
            logLevel: 'error'
        })
        task.succeed()
    } catch (e: any) {
        task.fail(e.message)
    }
}

build('ts')
build('react')
