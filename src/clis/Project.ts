import path = require('path')
import fs = require('fs')
import fsExtra = require('fs-extra')
import { spawnSync, SpawnOptions } from 'child_process'
import _ from 'lodash'
import { onGenCommand, onGetDir } from '../utils'

export interface projectInfoType {
    name: string
    dirname: string
    tempInfo: tempInfoItemType
    src: string
    output: string
    copyFiles: string[]
}
export interface tempInfoItemType {
    name: string
    temp: Array<{
        name: string
    }>
}

export class Project {
    public cwd: string
    public command: string
    public excludes: string[]
    public tempRoot: string
    public tempInfo: Array<tempInfoItemType>
    public projectsInfo: Array<projectInfoType>
    constructor() {
        this.cwd = process.cwd()
        this.command = onGenCommand()
        this.excludes = ['node_modules', 'yarn-error.log', 'dist']
        this.tempRoot = path.join(__dirname, '../../template')
        this.tempInfo = onGetDir(this.tempRoot).map(name => {
            return {
                name,
                temp: onGetDir(path.join(this.tempRoot, name)).map(name => {
                    return { name }
                })
            }
        })
    }
    spawnSync(command: string, args?: ReadonlyArray<string>, options?: SpawnOptions) {
        const { error } = spawnSync(command, args, {
            stdio: 'inherit',
            cwd: this.cwd,
            shell: true,
            ...options
        })
        if (error) {
            process.exit(1)
        }
    }
    public getCliFilePath(p = '.') {
        return path.join(__dirname, '../../', p)
    }
    public onGetFiles = function (src: string, excludes: string[]) {
        return fs.readdirSync(src).filter(dir => !_.includes(excludes, dir))
    }
    public onCopy(tempPath, output) {
        fsExtra.readdirSync(tempPath).map(name => {
            if (name !== 'node_modules') {
                fsExtra.copySync(path.join(tempPath, name), path.join(output, name))
            }
        })
    }
    public onEnd(output: string) {
        const npmignore = path.join(output, '.npmignore')
        if (fs.existsSync(npmignore)) {
            fs.renameSync(npmignore, path.join(output, '.gitignore'))
        }
        spawnSync(this.command, ['install'], {
            cwd: output,
            stdio: 'inherit'
        })
    }
}
