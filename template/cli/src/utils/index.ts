import { execSync } from 'child_process'
import { readdirSync } from 'fs'

export function hasPnpm() {
    try {
        execSync('pnpm --version')
        return true
    } catch {
        return false
    }
}
export function hasYarn() {
    try {
        execSync('yarnpkg --version')
        return true
    } catch {
        return false
    }
}
export function onGenCommand() {
    if (hasPnpm()) {
        return 'pnpm'
    }
    if (hasYarn()) {
        return 'yarn'
    }
    return 'npm'
}

export function onGetDir(root: string) {
    const dirs: string[] = []
    readdirSync(root, { withFileTypes: true }).forEach(o => {
        if (o.isDirectory()) {
            dirs.push(o.name)
        }
    })
    return dirs
}
