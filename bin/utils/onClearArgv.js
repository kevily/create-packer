const _ = require('lodash')

module.exports = function onClearArgv() {
    const argv = process.argv.slice(2)
    const result = {
        dirname: '',
        clis: []
    }
    argv.forEach(k => {
        if (_.startsWith(k, '-')) {
            result.clis.push(k)
        } else {
            result.dirname = k
        }
    })
    if (result.clis.length <= 0) {
        result.clis.push('-c')
    }
    return result
}
