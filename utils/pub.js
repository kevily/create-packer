const inquirer = require('@inquirer/prompts')
const pkg = require('../package.json')
const { execSync } = require('child_process')
const chalk = require('chalk')

function genPrompt(nextVersion) {
    const version = {
        major: 0,
        minor: 1,
        patch: 2
    }
    const nextVersionIndex = version[nextVersion]
    const newVersion = pkg.version.split('.').map(Number)
    newVersion[nextVersionIndex] += 1
    // 把后续的版本号归零
    // ------------------------------------------------------------------------
    for (let i = nextVersionIndex + 1; i < 3; i++) {
        newVersion[i] = 0
    }
    return `${nextVersion}(${newVersion.join('.')})`
}

const versions = {
    [genPrompt('patch')]: 'patch',
    [genPrompt('minor')]: 'minor',
    [genPrompt('major')]: 'major'
}

inquirer
    .select({
        message: 'version:',
        choices: Object.keys(versions)
    })
    .then(version => {
        execSync(
            `npm version ${versions[version]} && pnpm publish --registry https://registry.npmjs.org && git push`
        )
        console.log(chalk.blue('Published（*＾3＾）'))
    })
