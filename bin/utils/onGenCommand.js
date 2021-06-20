module.exports = function onGenCommand() {
    try {
        cp.execSync('yarnpkg --version')
        return 'yarn'
    } catch {
        return 'npm'
    }
}
