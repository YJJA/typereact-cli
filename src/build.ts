'use strict';

/*
  build script
 */
import webpack from 'webpack';
import fse from 'fs-extra';
import { paths } from './config/paths';
import { webpackClientConfig } from './config/webpack.client.config';
import { webpackServerConfig } from './config/webpack.server.config';

import { buildEcosystemFile } from './scripts/buildEcosystemFile';
import { buildPackageFile } from './scripts/buildPackageFile';
import { IArgv } from './interfaces/argv.interface';

// build
export async function build(argvs: IArgv) {
  await fse.remove(paths.distPath(argvs));
  const serverConfig = webpackServerConfig(argvs);
  const clientConfig = webpackClientConfig(argvs);

  await runWebpack([serverConfig, clientConfig]);

  await buildEcosystemFile(argvs);
  await buildPackageFile(argvs);
}

// webpack build
function runWebpack(webpackConfig: webpack.Configuration[]) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    // compiler.apply(new ProgressPlugin())
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      const info = stats.toJson();
      if (stats.hasErrors()) {
        info.warnings.forEach((err: any) => console.error(err));
      }

      if (stats.hasWarnings()) {
        info.warnings.forEach((err: any) => console.warn(err + '\n'));
      }

      process.stdout.write(
        stats.toString({
          chunks: false,
          colors: true,
        })
      );

      resolve();
    });
  });
}
