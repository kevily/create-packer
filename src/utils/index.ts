import { execSync } from 'child_process'
import { readdirSync } from 'fs'

export function onGenCommand() {
    try {
        execSync('yarnpkg --version')
        return 'yarn'
    } catch {
        return 'npm'
    }
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
