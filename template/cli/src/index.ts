#!/usr/bin/env node
import { createTemp } from './clis/createTemp'
import { program } from 'commander'

program
    .option('-c, --create <dirname>', 'Create project.', dirname => {
        return createTemp(dirname)
    })
    .parse(process.argv)
