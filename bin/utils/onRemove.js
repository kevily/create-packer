const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const configs = require('../configs')
const _ = require('lodash')

module.exports = function (files) {
    _.forEach(files, file => {
        const target = path.join(configs.OUTPUT, file)
        if (fs.existsSync(target)) {
            fsExtra.removeSync(target)
        }
    })
}
