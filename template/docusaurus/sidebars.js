/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const fs = require('fs')
const path = require('path')
const docs = path.join(__dirname, 'docs')
const someSidebar = {
    other: []
}

function filesToSidebar(key, files, dirname) {
    files.forEach(file => {
        const [filename, suffix] = file.split('.')
        if (['md', 'mdx'].includes(suffix)) {
            if (!Array.isArray(someSidebar[key])) {
                someSidebar[key] = []
            }
            let id = filename
            if (dirname) {
                id = dirname + '/' + id
            }
            someSidebar[key].push(id)
        }
    })
}
fs.readdirSync(docs).forEach(name => {
    const currentPath = path.join(docs, name)
    const isDir = fs.statSync(currentPath).isDirectory()
    if (isDir) {
        const files = fs.readdirSync(currentPath).filter(file => {
            return fs.statSync(path.join(currentPath, file)).isFile()
        })
        filesToSidebar(name, files, name)
    } else {
        filesToSidebar('other', [name])
    }
})

module.exports = {
    someSidebar
}
