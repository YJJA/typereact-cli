import * as fse from 'fs-extra';
import { paths } from '../config/paths';
import { IArgv } from '../interfaces/argv.interface';

export const buildEcosystemFile = (argv: IArgv) => {
  const packageJson = require(paths.srcPath(argv, 'package.json'));

  const app = {
    name: `${argv.prefix ? `${argv.prefix}-` : ''}${packageJson.name}`,
    script: `./index.js`,
    watch: false,
    instances: 1,
    node_args: '--harmony',
    exec_interpreter: 'node',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    merge_logs: false,
    env: {
      NODE_ENV: argv.env,
    },
    error_file: `./logs/error/error.log`,
    out_file: `./logs/out/out.log`,
  };

  const dist = paths.distPath(argv, 'ecosystem.json');
  return fse.outputJson(dist, { apps: [app] }, { spaces: 2 });
};
