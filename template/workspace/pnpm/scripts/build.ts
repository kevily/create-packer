import { Engine, rollup } from '1k-tasks'
import * as path from 'path'

const root = path.join(process.cwd(), 'packages/test')
const reactTask = new Engine()
reactTask.registry('rollup', rollup.build, {
    root,
    workDir: 'src',
    input: '**/*.ts',
    outputDir: 'dist'
})

reactTask.run()
