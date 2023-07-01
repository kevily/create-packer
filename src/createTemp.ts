import inquirer = require('inquirer')
import fsExtra = require('fs-extra')
import path = require('path')
import chalk = require('chalk')
import ora = require('ora')
import { spawnSync } from 'child_process'
import { genTemplateInfoList, onGenCommand } from './utils'
import { existsSync } from 'fs'

const cwd = process.cwd()
const command = onGenCommand()
const excludes = ['node_modules', 'yarn-error.log', 'dist']
const tempRoot = path.join(__dirname, '../template')
const tempInfoList = genTemplateInfoList(tempRoot)

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
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'temp',
            message: 'Select temp.',
            choices: tempInfoList.map(o => o.name)
        }
    ])
    let tempInfo = tempInfoList.find(o => o.name === answer.temp)
    if (tempInfo.children.length > 0) {
        answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'temp',
                message: 'Select temp type.',
                choices: tempInfo.children.map(o => o.name)
            }
        ])
        tempInfo = tempInfo.children.find(o => o.name === answer.temp)
    }
    const creating = ora(chalk.yellow('Creating...\n')).start()
    const output = path.join(cwd, isCurrent ? '' : dirname)
    if (!isCurrent && existsSync(output)) {
        return console.log(chalk.red(`${dirname} already exists!`))
    }
    if (!isCurrent) {
        fsExtra.mkdirSync(output)
    }
    copyTempFile(tempInfo.src, output)
    createTempEnd(output)
    creating.succeed()
}
