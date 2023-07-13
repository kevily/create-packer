"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemp = void 0;
const inquirer = require("inquirer");
const fsExtra = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const fs_1 = require("fs");
const cwd = process.cwd();
const command = utils_1.onGenCommand();
const excludes = ['node_modules', 'yarn-error.log', 'dist'];
const tempRoot = path.join(__dirname, '../template');
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
    let tempInfo = tempInfoList.find(o => o.name === answer.temp);
    if (tempInfo.children.length > 0) {
        answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'temp',
                message: 'Select temp type.',
                choices: tempInfo.children.map(o => o.name)
            }
        ]);
        tempInfo = tempInfo.children.find(o => o.name === answer.temp);
    }
    const creating = ora(chalk.yellow('Creating...\n')).start();
    const output = path.join(cwd, isCurrent ? '' : dirname);
    if (!isCurrent && fs_1.existsSync(output)) {
        return console.log(chalk.red(`${dirname} already exists!`));
    }
    if (!isCurrent) {
        fsExtra.mkdirSync(output);
    }
    copyTempFile(tempInfo.src, output);
    createTempEnd(output);
    creating.succeed();
}
exports.createTemp = createTemp;
