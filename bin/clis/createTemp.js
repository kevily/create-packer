"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemp = void 0;
const inquirer = require("inquirer");
const fsExtra = require("fs-extra");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const ora = require("ora");
const child_process_1 = require("child_process");
const utils_1 = require("../utils");
const cwd = process.cwd();
const command = utils_1.onGenCommand();
const excludes = ['node_modules', 'yarn-error.log', 'dist'];
const tempRoot = path.join(__dirname, '../../template');
const tempInfo = utils_1.onGetDir(tempRoot).map(name => {
    return {
        name,
        src: path.join(tempRoot, name)
    };
});
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
    const { temp } = await inquirer.prompt([
        {
            type: 'list',
            name: 'temp',
            message: 'Select temp.',
            choices: tempInfo.map(o => o.name)
        }
    ]);
    const creating = ora(chalk.yellow('Creating...\n')).start();
    const output = path.join(cwd, isCurrent ? '' : dirname);
    if (!isCurrent && fs.existsSync(output)) {
        return console.log(chalk.red(`${dirname} already exists!`));
    }
    if (!isCurrent) {
        fsExtra.mkdirSync(output);
    }
    const tempPath = path.join(tempRoot, temp);
    copyTempFile(tempPath, output);
    createTempEnd(output);
    creating.succeed();
}
exports.createTemp = createTemp;
