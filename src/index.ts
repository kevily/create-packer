#!/usr/bin/env node
import { Create } from './clis/Create'
import { program } from 'commander'

const create = new Create()
let dirname = ''
program
    .argument('[dirname]')
    .action(name => {
        dirname = name || ''
    })
    .option('-c', 'Create project.')
    .parse(process.argv)

const options = program.opts()

if (options.c) {
    create.onCreate(dirname)
}
