const inquirer = require('inquirer')
const currentVersion = require('../package.json').version
const { execSync } = require('child_process')
const chalk = require('chalk')

function genPrompt(nextVersion) {
    const version = {
        major: 0,
        minor: 1,
        patch: 2
    }
    const nextVersionIndex = version[nextVersion]
    const newVersion = currentVersion.split('.').map(Number)
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
    .prompt([
        {
            type: 'list',
            name: 'version',
            message: 'version:',
            choices: Object.keys(versions)
        }
    ])
    .then(({ version }) => {
        execSync(
            `npm version ${versions[version]} && npm publish --registry http://registry.npmjs.org && git push`
        )
        console.log(chalk.blue('Published（*＾3＾）'))
    })
