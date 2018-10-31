import * as fse from 'fs-extra';
import { paths } from '../config/paths';
import { IArgv } from '../interfaces/argv.interface';

export const buildPackageFile = (argv: IArgv) => {
  const packageJsonPath = paths.srcPath(argv, 'package.json');
  const distPackageJsonPath = paths.distPath(argv, 'package.json');
  return fse.copy(packageJsonPath, distPackageJsonPath);
};
