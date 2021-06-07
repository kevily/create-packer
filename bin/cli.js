const path = require('path')
const fs = require('fs')
const cp = require('child_process')
const _ = require('lodash')
const configs = require('./configs')

class Cli {
    constructor() {
        this.extends = []
    }
    onRegister(arr) {
        _.forEach(arr, Extend => {
            this.extends.push(new Extend())
        })
    }
    async onStart() {
        for (let i = 0; i < this.extends.length; i++) {
            let extend = this.extends[i]
            await extend.onStart()
        }
        const npmignore = path.join(configs.OUTPUT, '.npmignore')
        if (fs.existsSync(npmignore)) {
            fs.renameSync(npmignore, path.join(configs.OUTPUT, '.gitignore'))
        }
        cp.spawn(configs.COMMAND, ['install'], configs.SPAWN_OPS)
    }
}

module.exports = Cli
