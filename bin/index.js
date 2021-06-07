#!/usr/bin/env node
const Cli = require('./cli')
const CopyTemp = require('./extends/CopyTemp')

const cli = new Cli()

cli.onRegister([CopyTemp])

cli.onStart()
