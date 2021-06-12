const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const cp = require('child_process')
const inquirer = require('inquirer')
const configs = require('../configs')
const _ = require('lodash')
const chalk = require('chalk')
const onRemove = require('../utils/onRemove')

module.exports = class {
    tempSrc = ''
    onClear() {
        console.log(chalk.yellow('clearing...'))
        onRemove(configs.EXCLUDES)
    }
    onEnd() {
        const npmignore = path.join(configs.OUTPUT, '.npmignore')
        if (fs.existsSync(npmignore)) {
            fs.renameSync(npmignore, path.join(configs.OUTPUT, '.gitignore'))
        }
        const ls = cp.spawn(configs.COMMAND, ['install'], configs.SPAWN_OPS)
        ls.on('close', () => {
            cp.spawn(configs.COMMAND, ['format'], configs.SPAWN_OPS)
        })
    }
    onCopy({ excludes, includes }) {
        fs.readdirSync(this.tempSrc).forEach(dirname => {
            let isCopy = false
            if (_.size(includes) > 0) {
                isCopy = _.includes(includes, dirname)
            } else {
                isCopy = !_.includes(_.concat(configs.EXCLUDES, excludes), dirname)
            }
            if (isCopy) {
                const target = path.join(this.tempSrc, dirname)
                const dest = path.join(configs.OUTPUT, dirname)
                // remove old files
                // ------------------------------------------------------------------------
                onRemove([dirname])
                fsExtra.copySync(target, dest)
            }
        })
    }
    onUpdatePackageJson() {
        const packageFileName = 'package.json'
        const outputPackage = path.join(configs.OUTPUT, packageFileName)
        const newPackage = require(path.join(this.tempSrc, packageFileName))
        const { dependencies } = require(outputPackage)
        newPackage.dependencies = _.assign(dependencies, newPackage.dependencies)
        fsExtra.removeSync(outputPackage)
        fsExtra.writeJsonSync(outputPackage, newPackage)
    }
    onUpdate() {
        const excludes = ['src', 'mock', 'package.json', 'public']
        console.log(chalk.yellow('copying...'))
        this.onCopy({ excludes })
        this.onUpdatePackageJson()
    }
    async onStart() {
        const { template, isUpdate } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'isUpdate',
                message: `The project already exists, whether update?`,
                when: () => {
                    return fs.existsSync(path.join(configs.OUTPUT, 'package.json'))
                }
            },
            { type: 'list', name: 'template', choices: [...configs.TEMPLATES.keys()] }
        ])
        this.tempSrc = configs.TEMPLATES.get(template)
        this.onClear()
        if (isUpdate) {
            this.onUpdate()
        } else {
            this.onCopy({})
        }
        this.onEnd()
    }
}
