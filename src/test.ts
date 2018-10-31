import { IArgv } from './interfaces/argv.interface';
import jestConfig from './config/jest.config';
import { paths } from './config/paths';

export async function test(argv: IArgv) {
  jestConfig.rootDir = paths.srcPath(argv);
  const argvs = process.argv.slice(argv.workspace ? 4 : 3);
  argvs.push('--config', JSON.stringify(jestConfig));
  require('jest').run(argvs);
}
