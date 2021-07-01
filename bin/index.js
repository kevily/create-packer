#!/usr/bin/env node
const clis = require('./clis')
const configs = require('./configs')

configs.CLIS.map(async cli => {
    await clis[cli].onStart()
})
