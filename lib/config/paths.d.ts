import { IArgv } from '../interfaces/argv.interface';
export declare const paths: {
    workPath(...args: string[]): string;
    distPath(argv: IArgv, ...args: string[]): string;
    srcPath(argv: IArgv, ...args: string[]): string;
};
