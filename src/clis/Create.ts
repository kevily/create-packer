import inquirer = require('inquirer')
import _ from 'lodash'
import { Project } from './Project'
import fsExtra = require('fs-extra')
import path = require('path')
import fs = require('fs')
import chalk = require('chalk')
import ora = require('ora')

export class Create extends Project {
    public async onCreate(dirname?: string) {
        const { tempType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'tempType',
                message: 'Select tempType.',
                choices: this.tempInfo.map(o => o.name)
            }
        ])
        const { temp } = await inquirer.prompt([
            {
                type: 'list',
                name: 'temp',
                message: 'Select temp.',
                choices: _.map(_.find(this.tempInfo, { name: tempType }).temp, t => t.name)
            }
        ])
        const creating = ora(chalk.yellow('Creating...\n')).start()
        const output = path.join(this.cwd, dirname)
        if (dirname && fs.existsSync(output)) {
            return console.log(chalk.red(`${dirname} already exists!`))
        }
        if (dirname) {
            fsExtra.mkdirSync(output)
        }
        const tempPath = path.join(this.tempRoot, tempType, temp)
        this.onCopy(tempPath, output)
        this.onEnd(output)
        creating.succeed()
    }
}
