const path = require('path')
const fs = require('fs')

module.exports = function onGenTemps() {
    const result = new Map()
    const tempDir = path.join(__dirname, '../../template')
    fs.readdirSync(tempDir).forEach(dirname => {
        if (dirname.startsWith('.')) {
            return false
        }
        result.set(dirname, path.join(tempDir, dirname))
    })
    return result
}
