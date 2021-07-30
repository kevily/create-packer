import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import cp, { SpawnOptions } from 'child_process'
import _ from 'lodash'
import chalk from 'chalk'
import { onGenCommand, onGetDir } from '../utils'
import ora from 'ora'

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
        const { error } = cp.spawnSync(command, args, {
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
    public onGenProjectsInfo(tempInfo: tempInfoItemType, dirname?: string) {
        const info: projectInfoType = {
            name: tempInfo.name,
            dirname: dirname || tempInfo.name,
            tempInfo,
            src: path.join(this.tempRoot, tempInfo.name),
            output: '',
            copyFiles: []
        }
        info.output = path.join(this.cwd, info.dirname)
        info.copyFiles = this.onGenCopyFiles(info)
        return info
    }
    public onGenCopyFiles(projectInfo: projectInfoType): string[] {
        const rootExcludes = [...this.excludes, 'src']
        const srcRoot = path.join(projectInfo.src, 'src')
        const rootFiles = this.onGetFiles(projectInfo.src, rootExcludes)
        const srcFiles = this.onGetFiles(srcRoot, this.excludes).map(file => `src/${file}`)
        return _.concat([], rootFiles, srcFiles)
    }
    public onEnd(projectInfo: projectInfoType) {
        const npmignore = path.join(projectInfo.output, '.npmignore')
        if (fs.existsSync(npmignore)) {
            fs.renameSync(npmignore, path.join(projectInfo.output, '.gitignore'))
        }
        cp.spawnSync(this.command, ['install'], {
            cwd: projectInfo.output
        })
        ora(chalk.blue('Completed(´ε｀ )\n')).succeed()
    }
    /**
     *
     * @param projectInfo 项目信息
     * @param isCheck 是否在拷贝前检查项目是否存在
     * @returns boolean
     */
    public onCopyProject(projectInfo: projectInfoType, isCheck = false) {
        if (!isCheck && fs.existsSync(projectInfo.output)) {
            console.log(chalk.red(`${projectInfo.dirname}已存在！`))
            return false
        }
        _.forEach(projectInfo.copyFiles, file => {
            const src = path.join(projectInfo.src, file)
            const output = path.join(projectInfo.output, file)
            fsExtra.copySync(src, output, { overwrite: true })
        })
        return true
    }
}
