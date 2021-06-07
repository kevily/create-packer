const path = require('path')
const fs = require('fs')
const cp = require('child_process')
const [dirname = ''] = process.argv.slice(2)
const targetDir = path.join(__dirname, '../template')
const OUTPUT = path.join(process.cwd(), dirname)

function onGenTemplates() {
    const result = new Map()
    fs.readdirSync(targetDir).forEach(dirname => {
        if (dirname.startsWith('.')) {
            return false
        }
        result.set(dirname, path.join(targetDir, dirname))
    })
    return result
}

function genCommand() {
    try {
        cp.execSync('yarnpkg --version')
        return 'yarn'
    } catch {
        return 'npm'
    }
}

module.exports = {
    OUTPUT,
    COMMAND: genCommand(),
    EXCLUDES: ['node_modules', 'yarn.lock'],
    SPAWN_OPS: {
        stdio: 'inherit',
        cwd: OUTPUT,
        shell: true
    },
    TEMPLATES: onGenTemplates()
}
