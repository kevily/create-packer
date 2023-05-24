export interface tempInfoType {
    name: string;
    src: string;
}
export declare function createTemp(dirname: string): Promise<void>;
