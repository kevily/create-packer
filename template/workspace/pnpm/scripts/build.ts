import { Engine, babel } from '1k-tasks'
import * as path from 'path'

const reactTask = new Engine({ root: path.join(process.cwd(), 'packages/test') })
reactTask.registry('babel', babel)

reactTask.run()
