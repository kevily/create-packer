#!/usr/bin/env node

const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')

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

inquirer
    .prompt([{ type: 'list', name: 'template', choices }])
    .then(({ template, mkdir, dirname }) => {
        fsExtra.copySync(entry.get(template), output)
        fs.renameSync(path.join(output, '.npmignore'), path.join(output, '.gitignore'))
        console.log(chalk.yellow('created（*＾3＾）'))
    })
    .catch(error => {
        throw new Error(error)
    })
