'use strict';

/*
  watch client
 */
import webpack from 'webpack';
import path from 'path';
import { webpackServerConfig } from '../config/webpack.server.config';
import { IArgv } from '../interfaces/argv.interface';

// watchServer
export const watchServer = (argv: IArgv): Promise<string> => {
  return new Promise((resolve, reject) => {
    const serverConfig = webpackServerConfig(argv);
    const serverCompiler = webpack(serverConfig);

    const serverPath = serverConfig.output
      ? path.join(
          serverConfig.output.path || '',
          serverConfig.output.filename || ''
        )
      : '';
    let isResolve = false;

    serverCompiler.watch(
      {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
      },
      (error, stats) => {
        if (error) {
          reject(error);
          return;
        }
        if (!isResolve) {
          isResolve = true;
          console.log('watch server is watching....');
          resolve(serverPath);
        }
        const statsJson = stats.toJson();
        statsJson.errors.forEach((err: any) => console.error(err));
        statsJson.warnings.forEach((err: any) => console.warn(err));
      }
    );
  });
};
