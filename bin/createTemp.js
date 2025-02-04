import chalk from 'chalk';
import * as inquirer from '@inquirer/prompts';
import fsExtra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';
import { spawnSync } from 'child_process';
import { genTemplateInfoList, onGenCommand } from './utils/index.js';
import { existsSync } from 'fs';
const cwd = process.cwd();
const command = onGenCommand();
const dirname = path.dirname(fileURLToPath(import.meta.url));
const excludes = ['node_modules', 'yarn-error.log', 'dist'];
const tempRoot = path.join(dirname, '../template');
const tempInfoList = genTemplateInfoList(tempRoot);
function copyTempFile(tempPath, output) {
    fsExtra.readdirSync(tempPath).map(name => {
        if (!excludes.includes(name)) {
            fsExtra.copySync(path.join(tempPath, name), path.join(output, name));
        }
    });
}
function createTempEnd(output) {
    spawnSync(command, ['install'], {
        cwd: output,
        stdio: 'inherit'
    });
}
export async function createTemp(dirname) {
    const isCurrent = dirname === '.';
    let answer = await inquirer.select({
        message: 'Select temp.',
        choices: tempInfoList.map(o => o.name)
    });
    let tempInfo = tempInfoList.find(o => o.name === answer);
    if (tempInfo?.children && tempInfo.children.length > 0) {
        answer = await inquirer.select({
            message: 'Select temp type.',
            choices: tempInfo.children.map(o => o.name)
        });
        tempInfo = tempInfo.children.find(o => o.name === answer);
    }
    const creating = ora(chalk.yellow('Creating...\n')).start();
    const output = path.join(cwd, isCurrent ? '' : dirname);
    if (!isCurrent && existsSync(output)) {
        return console.log(chalk.red(`${dirname} already exists!`));
    }
    if (!isCurrent) {
        fsExtra.mkdirSync(output);
    }
    copyTempFile(tempInfo.src, output);
    createTempEnd(output);
    creating.succeed();
}
