import inquirer = require('inquirer')
import _ from 'lodash'
import { Project } from './Project'
import fsExtra = require('fs-extra')
import path = require('path')

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
        fsExtra.mkdirSync(path.join(this.cwd, dirname))
        fsExtra.copySync(path.join(this.tempRoot, dirname, tempType, temp), this.cwd)
    }
}
