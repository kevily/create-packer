import fs from 'fs'
import path from 'path'
import { rimrafSync } from 'rimraf'
import { OUTPUT_ROOT } from './config'

const foldersToRemove = [path.join(process.cwd(), OUTPUT_ROOT)]

foldersToRemove.forEach(folder => {
    if (fs.existsSync(folder)) rimrafSync(folder)
})
