const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const configs = require('../configs')
const _ = require('lodash')

module.exports = function onRemove(files) {
    _.forEach(files, file => {
        const target = path.join(configs.CWD, file)
        if (fs.existsSync(target)) {
            fsExtra.removeSync(target)
        }
    })
}
