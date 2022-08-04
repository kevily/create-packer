"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGetDir = exports.onGenCommand = exports.hasYarn = exports.hasPnpm = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
function hasPnpm() {
    try {
        child_process_1.execSync('pnpm --version');
        return true;
    }
    catch {
        return false;
    }
}
exports.hasPnpm = hasPnpm;
function hasYarn() {
    try {
        child_process_1.execSync('yarnpkg --version');
        return true;
    }
    catch {
        return false;
    }
}
exports.hasYarn = hasYarn;
function onGenCommand() {
    if (hasPnpm()) {
        return 'pnpm';
    }
    if (hasYarn()) {
        return 'yarn';
    }
    return 'npm';
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
