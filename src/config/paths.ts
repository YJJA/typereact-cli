import path from 'path';
import { IArgv } from '../interfaces/argv.interface';

const workPath = process.cwd();

// temp build dirname
export const paths = {
  workPath(...args: string[]) {
    return path.join(workPath, ...args);
  },
  distPath(argv: IArgv, ...args: string[]) {
    const workspace = argv.workspace ? `packages/${argv.workspace}` : '';
    return argv.dev
      ? this.workPath(workspace, `node_modules/.temp`, ...args)
      : this.workPath(workspace, `dist`, ...args);
  },
  srcPath(argv: IArgv, ...args: string[]) {
    const workspace = argv.workspace ? `packages/${argv.workspace}` : '';
    return this.workPath(workspace, ...args);
  },
};
