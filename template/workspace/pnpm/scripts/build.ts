import { Engine, babel, dts } from '1k-tasks'
import * as path from 'path'

const reactTask = new Engine({ root: path.join(process.cwd(), 'packages/test') })
reactTask.registry('dts', dts)
reactTask.registry('babel', babel)

reactTask.run()
