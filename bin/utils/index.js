"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGetDir = exports.onGenCommand = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
function onGenCommand() {
    try {
        child_process_1.execSync('yarnpkg --version');
        return 'yarn';
    }
    catch {
        return 'npm';
    }
}
exports.onGenCommand = onGenCommand;
function onGetDir(root) {
    const dirs = [];
    fs_1.readdirSync(root, { withFileTypes: true }).forEach(o => {
        if (o.isDirectory()) {
            dirs.push(o.name);
        }
    });
    return dirs;
}
exports.onGetDir = onGetDir;
