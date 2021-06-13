#!/usr/bin/env node
const Cli = require('./cli')
const CopyTemp = require('./extends/CopyTemp')
const configs = require('./configs')

const cli = new Cli()

cli.onRegister('copy', new CopyTemp())

cli.onStart(configs.STARTS)
