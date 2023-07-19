export declare function hasPnpm(): boolean;
export declare function hasYarn(): boolean;
export declare function onGenCommand(): "pnpm" | "yarn" | "npm";
interface tempInfoType {
    name: string;
    src: string;
    children?: tempInfoType[];
}
export declare function genTemplateInfoList(root: string): tempInfoType[];
export {};
