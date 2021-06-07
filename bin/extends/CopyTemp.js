const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const inquirer = require('inquirer')
const configs = require('../configs')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.tempSrc = ''
    }
    onIncludesValidator({ excludes, dirname }) {
        return !_.includes(excludes, dirname)
    }
    onCopy({ excludes } = { excludes: [] }) {
        fs.readdirSync(this.tempSrc).forEach(dirname => {
            const isCopy = this.onIncludesValidator({
                excludes: _.concat(configs.EXCLUDES, excludes),
                dirname
            })
            if (isCopy) {
                const target = path.join(this.tempSrc, dirname)
                const dest = path.join(configs.OUTPUT, dirname)
                fsExtra.copySync(target, dest)
            }
        })
    }
    onUpdate() {
        const excludes = ['src', 'mock', 'public']
        // Remove old files.
        // ------------------------------------------------------------------------
        fs.readdirSync(configs.OUTPUT).forEach(dirname => {
            if (this.onIncludesValidator({ excludes, dirname })) {
                fsExtra.removeSync(path.join(configs.OUTPUT, dirname))
            }
        })

        this.onCopy({ excludes })
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
        if (isUpdate) {
            this.onUpdate()
        } else {
            this.onCopy()
        }
    }
}
