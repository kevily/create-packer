const path = require('path')
const fs = require('fs')
const { docCatalog, docRootPath } = require('./configs')

const someSidebar = {}
docCatalog.forEach(dirname => {
    const dirPath = path.join(docRootPath, dirname)
    const files = fs.readdirSync(dirPath).filter(name => {
        return fs.statSync(path.join(dirPath, name)).isFile()
    })
    files.forEach(file => {
        const [filename, suffix] = file.split('.')
        if (!Array.isArray(someSidebar[dirname])) {
            someSidebar[dirname] = []
        }
        if (['md', 'mdx'].includes(suffix)) {
            let id = filename
            if (dirname) {
                id = dirname + '/' + id
            }
            someSidebar[dirname].push(id)
        }
    })
})

module.exports = {
    ...someSidebar
}
