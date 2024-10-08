"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemp = createTemp;
const inquirer_1 = __importDefault(require("inquirer"));
const fsExtra = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const fs_1 = require("fs");
const cwd = process.cwd();
const command = (0, utils_1.onGenCommand)();
const excludes = ['node_modules', 'yarn-error.log', 'dist'];
const tempRoot = path.join(__dirname, '../template');
const tempInfoList = (0, utils_1.genTemplateInfoList)(tempRoot);
function copyTempFile(tempPath, output) {
    fsExtra.readdirSync(tempPath).map(name => {
        if (!excludes.includes(name)) {
            fsExtra.copySync(path.join(tempPath, name), path.join(output, name));
        }
    });
}
function createTempEnd(output) {
    (0, child_process_1.spawnSync)(command, ['install'], {
        cwd: output,
        stdio: 'inherit'
    });
}
async function createTemp(dirname) {
    const isCurrent = dirname === '.';
    let answer = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'temp',
            message: 'Select temp.',
            choices: tempInfoList.map(o => o.name)
        }
    ]);
    let tempInfo = tempInfoList.find(o => o.name === answer.temp);
    if (tempInfo?.children && tempInfo.children.length > 0) {
        answer = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'temp',
                message: 'Select temp type.',
                choices: tempInfo.children.map(o => o.name)
            }
        ]);
        tempInfo = tempInfo.children.find(o => o.name === answer.temp);
    }
    const creating = (0, ora_1.default)(chalk_1.default.yellow('Creating...\n')).start();
    const output = path.join(cwd, isCurrent ? '' : dirname);
    if (!isCurrent && (0, fs_1.existsSync)(output)) {
        return console.log(chalk_1.default.red(`${dirname} already exists!`));
    }
    if (!isCurrent) {
        fsExtra.mkdirSync(output);
    }
    copyTempFile(tempInfo.src, output);
    createTempEnd(output);
    creating.succeed();
}
