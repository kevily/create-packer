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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPnpm = hasPnpm;
exports.hasYarn = hasYarn;
exports.onGenCommand = onGenCommand;
exports.genTemplateInfoList = genTemplateInfoList;
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const fs_1 = require("fs");
function hasPnpm() {
    try {
        (0, child_process_1.execSync)('pnpm --version');
        return true;
    }
    catch {
        return false;
    }
}
function hasYarn() {
    try {
        (0, child_process_1.execSync)('yarnpkg --version');
        return true;
    }
    catch {
        return false;
    }
}
function onGenCommand() {
    if (hasPnpm()) {
        return 'pnpm';
    }
    if (hasYarn()) {
        return 'yarn';
    }
    return 'npm';
}
function genTemplateInfoList(root) {
    const temps = [];
    (0, fs_1.readdirSync)(root, { withFileTypes: true }).forEach(o => {
        const src = path.join(root, o.name);
        if (o.isDirectory()) {
            temps.push({
                name: o.name,
                src,
                children: (0, fs_1.existsSync)(path.join(src, 'package.json')) ? [] : genTemplateInfoList(src)
            });
        }
    });
    return temps;
}
