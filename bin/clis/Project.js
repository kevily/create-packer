"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
const child_process_1 = require("child_process");
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
class Project {
    cwd;
    command;
    excludes;
    tempRoot;
    tempInfo;
    projectsInfo;
    constructor() {
        this.cwd = process.cwd();
        this.command = utils_1.onGenCommand();
        this.excludes = ['node_modules', 'yarn-error.log', 'dist'];
        this.tempRoot = path.join(__dirname, '../../template');
        this.tempInfo = utils_1.onGetDir(this.tempRoot).map(name => {
            return {
                name,
                temp: utils_1.onGetDir(path.join(this.tempRoot, name)).map(name => {
                    return { name };
                })
            };
        });
    }
    spawnSync(command, args, options) {
        const { error } = child_process_1.spawnSync(command, args, {
            stdio: 'inherit',
            cwd: this.cwd,
            shell: true,
            ...options
        });
        if (error) {
            process.exit(1);
        }
    }
    getCliFilePath(p = '.') {
        return path.join(__dirname, '../../', p);
    }
    onGetFiles = function (src, excludes) {
        return fs.readdirSync(src).filter(dir => !lodash_1.default.includes(excludes, dir));
    };
    onCopy(tempPath, output) {
        fsExtra.readdirSync(tempPath).map(name => {
            if (name !== 'node_modules') {
                fsExtra.copySync(path.join(tempPath, name), path.join(output, name));
            }
        });
    }
    onEnd(output) {
        child_process_1.spawnSync(this.command, ['install'], {
            cwd: output,
            stdio: 'inherit'
        });
    }
}
exports.Project = Project;
