"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
const inquirer = require("inquirer");
const lodash_1 = __importDefault(require("lodash"));
const Project_1 = require("./Project");
const fsExtra = require("fs-extra");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
class Create extends Project_1.Project {
    async onCreate(dirname) {
        const { tempType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'tempType',
                message: 'Select tempType.',
                choices: this.tempInfo.map(o => o.name)
            }
        ]);
        const { temp } = await inquirer.prompt([
            {
                type: 'list',
                name: 'temp',
                message: 'Select temp.',
                choices: lodash_1.default.map(lodash_1.default.find(this.tempInfo, { name: tempType }).temp, t => t.name)
            }
        ]);
        const output = path.join(this.cwd, dirname);
        if (dirname && fs.existsSync(output)) {
            return console.log(chalk.red(`${dirname} already exists!`));
        }
        fsExtra.mkdirSync(output);
        const tempPath = path.join(this.tempRoot, tempType, temp);
        this.onCopy(tempPath, output);
        this.onEnd(output);
    }
}
exports.Create = Create;
