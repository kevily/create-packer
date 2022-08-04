import inquirer = require('inquirer')
import fsExtra = require('fs-extra')
import path = require('path')
import fs = require('fs')
import chalk = require('chalk')
import ora = require('ora')
import { spawnSync } from 'child_process'
import { onGenCommand, onGetDir } from '../utils'

export interface tempInfoType {
    name: string
    src: string
}

const cwd = process.cwd()
const command = onGenCommand()
const excludes = ['node_modules', 'yarn-error.log', 'dist']
const tempRoot = path.join(__dirname, '../../template')
const tempInfo: tempInfoType[] = onGetDir(tempRoot).map(name => {
    return {
        name,
        src: path.join(tempRoot, name)
    }
})

function copyTempFile(tempPath, output) {
    fsExtra.readdirSync(tempPath).map(name => {
        if (!excludes.includes(name)) {
            fsExtra.copySync(path.join(tempPath, name), path.join(output, name))
        }
    })
}
function createTempEnd(output: string) {
    spawnSync(command, ['install'], {
        cwd: output,
        stdio: 'inherit'
    })
}

export async function createTemp(dirname: string) {
    const isCurrent = dirname === '.'
    const { temp } = await inquirer.prompt([
        {
            type: 'list',
            name: 'temp',
            message: 'Select temp.',
            choices: tempInfo.map(o => o.name)
        }
    ])
    const creating = ora(chalk.yellow('Creating...\n')).start()
    const output = path.join(cwd, isCurrent ? '' : dirname)
    if (!isCurrent && fs.existsSync(output)) {
        return console.log(chalk.red(`${dirname} already exists!`))
    }
    if (!isCurrent) {
        fsExtra.mkdirSync(output)
    }
    const tempPath = path.join(tempRoot, temp)
    copyTempFile(tempPath, output)
    createTempEnd(output)
    creating.succeed()
}
