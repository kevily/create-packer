#!/usr/bin/env node

const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')
const inquirer = require('inquirer')

const templateSrc = path.join(__dirname, '../template')
const output = process.cwd()
const choices = fs.readdirSync(templateSrc)
const entry = new Map()

choices.forEach((dirname) => {
    if (dirname.startsWith('.')) {
        return false
    }
    entry.set(dirname, path.join(templateSrc, dirname))
})

inquirer
    .prompt([{ type: 'list', name: 'template', choices }])
    .then(({ template }) => {
        fsExtra.copySync(entry.get(template), output)
    })
    .catch((error) => {
        console.log('error', error)
    })
