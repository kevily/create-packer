"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemp = void 0;
const inquirer = require("inquirer");
const fsExtra = require("fs-extra");
const path = require("path");
const child_process_1 = require("child_process");
const utils_1 = require("../utils");
const cwd = process.cwd();
const command = utils_1.onGenCommand();
const excludes = ['node_modules', 'yarn-error.log', 'dist'];
const tempRoot = path.join(__dirname, '../../template');
const tempInfoList = utils_1.genTemplateInfoList(tempRoot);
function copyTempFile(tempPath, output) {
    fsExtra.readdirSync(tempPath).map(name => {
        if (!excludes.includes(name)) {
            fsExtra.copySync(path.join(tempPath, name), path.join(output, name));
        }
    });
}
function createTempEnd(output) {
    child_process_1.spawnSync(command, ['install'], {
        cwd: output,
        stdio: 'inherit'
    });
}
async function createTemp(dirname) {
    const isCurrent = dirname === '.';
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'temp',
            message: 'Select temp.',
            choices: tempInfoList.map(o => o.name)
        }
    ]);
    const tempInfo = tempInfoList.find(o => o.name === answer.temp);
    if (tempInfo.children) {
        answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'temp',
                message: 'Select temp.',
                choices: tempInfo.children.map(o => o.name)
            }
        ]);
    }
    console.log('answer.temp', answer.temp);
    // const creating = ora(chalk.yellow('Creating...\n')).start()
    // const output = path.join(cwd, isCurrent ? '' : dirname)
    // if (!isCurrent && existsSync(output)) {
    //     return console.log(chalk.red(`${dirname} already exists!`))
    // }
    // if (!isCurrent) {
    //     fsExtra.mkdirSync(output)
    // }
    // const tempPath = path.join(tempRoot, temp)
    // copyTempFile(tempPath, output)
    // createTempEnd(output)
    // creating.succeed()
}
exports.createTemp = createTemp;
