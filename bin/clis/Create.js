const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const cp = require('child_process')
const inquirer = require('inquirer')
const configs = require('../configs')
const _ = require('lodash')
const chalk = require('chalk')
const onRemove = require('../utils/onRemove')

module.exports = class Create {
    tempPath = ''
    onClear() {
        console.log(chalk.yellow('remove configs...'))
        onRemove(configs.EXCLUDES)
    }
    onEnd() {
        const npmignore = path.join(configs.CWD, '.npmignore')
        if (fs.existsSync(npmignore)) {
            fs.renameSync(npmignore, path.join(configs.CWD, '.gitignore'))
        }
        const ls = cp.spawn(configs.COMMAND, ['install'], configs.SPAWN_OPS)
        ls.on('close', () => {
            cp.spawn(configs.COMMAND, ['format'], configs.SPAWN_OPS)
        })
    }
    onCopy({ files, excludes }) {
        const _files = _.isArray(files) ? files : fs.readdirSync(this.tempPath)
        _.forEach(_files, file => {
            let isCopy = !_.includes(_.concat(configs.EXCLUDES, excludes), file)
            if (isCopy) {
                const target = path.join(this.tempPath, file)
                const dest = path.join(configs.CWD, file)
                // 删除旧文件
                // ------------------------------------------------------------------------
                onRemove([file])
                if (fs.existsSync(target)) {
                    fsExtra.copySync(target, dest)
                }
            }
        })
    }
    async onSelectedTemp() {
        const { template } = await inquirer.prompt([
            { type: 'list', name: 'template', choices: [...configs.TEMPS.keys()] }
        ])
        this.tempPath = configs.TEMPS.get(template)
    }
    async onStart() {
        if (process.cwd() !== configs.CWD && fs.existsSync(configs.CWD)) {
            console.log(chalk.red('The project already exists!'))
            process.exit(1)
        }
        await this.onSelectedTemp()
        this.onCopy({})
        this.onEnd()
    }
}
