#!/usr/bin/env node
import { createTemp } from './createTemp.js'
import { program } from 'commander'

program.argument('<dirname>', 'Create project.', dirname => createTemp(dirname)).parse(process.argv)
