#!/usr/bin/env node
import { Create } from './clis/Create'
import { program } from 'commander'

const create = new Create()
program.option('-c [dirname]', 'Create project.').parse(process.argv)

const options = program.opts()

if (options.c) {
    let dirname = ''
    if (options.c !== true) {
        dirname = options.c
    }
    create.onCreate(dirname)
}
