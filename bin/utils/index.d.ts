export declare function hasPnpm(): boolean;
export declare function hasYarn(): boolean;
export declare function onGenCommand(): "pnpm" | "yarn" | "npm";
export declare function onGetDir(root: string): string[];
