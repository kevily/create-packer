const path = require('path')

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')
const OUTPUT = path.join(ROOT, 'dist')

module.exports = {
    ROOT,
    SRC,
    OUTPUT,
    STATIC_DIR: 'static',
    gzip: false,
    scopeClassName: '[name]__[local]--[hash:base64:5]'
}
