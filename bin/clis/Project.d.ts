/// <reference types="node" />
import { SpawnOptions } from 'child_process';
export interface projectInfoType {
    name: string;
    dirname: string;
    tempInfo: tempInfoItemType;
    src: string;
    output: string;
    copyFiles: string[];
}
export interface tempInfoItemType {
    name: string;
    temp: Array<{
        name: string;
    }>;
}
export declare class Project {
    cwd: string;
    command: string;
    excludes: string[];
    tempRoot: string;
    tempInfo: Array<tempInfoItemType>;
    projectsInfo: Array<projectInfoType>;
    constructor();
    spawnSync(command: string, args?: ReadonlyArray<string>, options?: SpawnOptions): void;
    getCliFilePath(p?: string): string;
    onGetFiles: (src: string, excludes: string[]) => string[];
    onCopy(tempPath: any, output: any): void;
    onEnd(output: string): void;
}
