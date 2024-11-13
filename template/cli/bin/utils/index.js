import * as path from 'path';
import { execSync } from 'child_process';
import { readdirSync, existsSync } from 'fs';
export function hasPnpm() {
    try {
        execSync('pnpm --version');
        return true;
    }
    catch {
        return false;
    }
}
export function hasYarn() {
    try {
        execSync('yarnpkg --version');
        return true;
    }
    catch {
        return false;
    }
}
export function onGenCommand() {
    if (hasPnpm()) {
        return 'pnpm';
    }
    if (hasYarn()) {
        return 'yarn';
    }
    return 'npm';
}
export function genTemplateInfoList(root) {
    const temps = [];
    readdirSync(root, { withFileTypes: true }).forEach(o => {
        const src = path.join(root, o.name);
        if (o.isDirectory()) {
            temps.push({
                name: o.name,
                src,
                children: existsSync(path.join(src, 'package.json')) ? [] : genTemplateInfoList(src)
            });
        }
    });
    return temps;
}
