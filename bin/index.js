#!/usr/bin/env node

const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')

const templateSrc = path.join(__dirname, '../template')
let output = process.cwd()
const entry = new Map()
const choices = fs.readdirSync(templateSrc).filter(dirname => {
    if (dirname.startsWith('.')) {
        return false
    }
    entry.set(dirname, path.join(templateSrc, dirname))
    return true
})

inquirer
    .prompt([
        { type: 'list', name: 'template', choices },
        {
            type: 'input',
            name: 'mkdir',
            message: 'mkdir(y/n):'
        },
        {
            type: 'input',
            name: 'dirname',
            message: 'input dirname(template):',
            when({ mkdir }) {
                return mkdir.toLowerCase() === 'y'
            }
        }
    ])
    .then(({ template, mkdir, dirname }) => {
        if (mkdir.toLowerCase() === 'y') {
            output = path.join(output, dirname || 'template')
            fsExtra.mkdirSync(output)
        }
        fsExtra.copySync(entry.get(template), output)
        console.log(chalk.yellow('created（*＾3＾）'))
    })
    .catch(error => {
        throw new Error(error)
    })
