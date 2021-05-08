const cp = require('child_process')
const fsExtra = require('fs-extra')
const { argv, cwd } = require('process')
const path = require('path')
const { scripts } = require('../app/package.json')

const root = cwd()
const VIEW_ROOT = path.resolve(root, 'view')
const APP_ROOT = path.resolve(root, 'app')
const SPAEN_OPTIONS = {
    shell: true,
    stdio: 'inherit'
}
const [packageArg] = argv.slice(2)

const args = Object.keys(scripts)
    .filter(k => k.startsWith('package-'))
    .map(k => k.split('-')[1])

if (fsExtra.existsSync(VIEW_ROOT)) {
    cp.spawnSync('npm run build', {
        ...SPAEN_OPTIONS,
        cwd: VIEW_ROOT
    })
    fsExtra.removeSync(path.join(APP_ROOT, 'view'))
    fsExtra.copySync(path.join(VIEW_ROOT, 'build'), path.join(APP_ROOT, 'view'))
    if (args.includes(packageArg)) {
        cp.spawnSync(`npm run package-${packageArg}`, {
            ...SPAEN_OPTIONS,
            cwd: APP_ROOT
        })
    } else {
        cp.spawnSync(`npm run package`, {
            ...SPAEN_OPTIONS,
            cwd: APP_ROOT
        })
    }
} else {
    throw new Error('不存在view目录')
}
