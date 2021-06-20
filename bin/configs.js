const path = require('path')
const onGenTemps = require('./utils/onGenTemps')
const onClearArgv = require('./utils/onClearArgv')
const onGenCommand = require('./utils/onGenCommand')

const { dirname, clis } = onClearArgv()
const cwd = path.join(process.cwd(), dirname)

module.exports = {
    CWD: cwd,
    COMMAND: onGenCommand(),
    EXCLUDES: ['node_modules', 'yarn.lock', 'yarn-error.log', 'dist'],
    SPAWN_OPS: { stdio: 'inherit', cwd, shell: true },
    TEMPS: onGenTemps(),
    CLIS: clis
}
