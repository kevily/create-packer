#!/usr/bin/env node

const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const cp = require('child_process')

const [dirname = ''] = process.argv.slice(2)
const templateSrc = path.join(__dirname, '../template')
let output = path.join(process.cwd(), dirname)
const entry = new Map()
const choices = fs.readdirSync(templateSrc).filter(dirname => {
    if (dirname.startsWith('.')) {
        return false
    }
    entry.set(dirname, path.join(templateSrc, dirname))
    return true
})
function genCammand() {
    try {
        cp.execSync('yarnpkg --version')
        return 'yarn'
    } catch {
        return 'npm'
    }
}

inquirer
    .prompt([
        { type: 'list', name: 'template', choices },
        {
            type: 'confirm',
            name: 'overwrite',
            message: `The ${dirname} folder already exists, overwrite?`,
            when() {
                return dirname ? fs.existsSync(output) : false
            }
        }
    ])
    .then(({ template, overwrite = false }) => {
        const npmignore = path.join(output, '.npmignore')
        if (overwrite) {
            fsExtra.removeSync(output)
        }
        fsExtra.copySync(entry.get(template), output)
        if (fs.existsSync(npmignore)) {
            fs.renameSync(npmignore, path.join(output, '.gitignore'))
        }
        cp.spawn(genCammand(), ['install'], { stdio: 'inherit', cwd: output })
        console.log(chalk.yellow('created（*＾3＾）'))
    })
    .catch(error => {
        throw new Error(error)
    })
