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
    root = ''
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
    onCopy({ files, excludes }) {
        const _files = _.isArray(files) ? files : fs.readdirSync(this.root)
        _.forEach(_files, file => {
            let isCopy = !_.includes(_.concat(configs.EXCLUDES, excludes), file)
            if (isCopy) {
                const target = path.join(this.root, file)
                const dest = path.join(configs.OUTPUT, file)
                // 删除旧文件
                // ------------------------------------------------------------------------
                onRemove([file])
                if (fs.existsSync(target)) {
                    fsExtra.copySync(target, dest)
                }
            }
        })
    }
    onUpdatePackageJson() {
        const packageFileName = 'package.json'
        const outputPackage = path.join(configs.OUTPUT, packageFileName)
        const newPackage = require(path.join(this.root, packageFileName))
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
        this.root = configs.TEMPLATES.get(template)
        this.onClear()
        if (isUpdate) {
            this.onUpdate()
        } else {
            this.onCopy({})
        }
        this.onEnd()
    }
}
