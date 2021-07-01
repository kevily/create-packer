const fs = require('fs')
const path = require('path')

const BOOK_DIR = path.resolve(process.cwd(), '_book')
fs.renameSync(BOOK_DIR, 'docs')
