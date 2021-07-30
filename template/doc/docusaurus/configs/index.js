const path = require('path')
const fs = require('fs')

const docRootPath = path.join(__dirname, '../docs')
module.exports = {
    docRootPath,
    docCatalog: fs.readdirSync(docRootPath).filter(name => {
        return fs.statSync(path.join(docRootPath, name)).isDirectory()
    })
}
