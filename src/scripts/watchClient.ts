/*
  watch client
 */
import * as path from 'path';
import fse from 'fs-extra';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';

import { paths } from '../config/paths';
import { IArgv } from '../interfaces/argv.interface';

import { webpackClientConfig } from '../config/webpack.client.config';

export const watchClient = (argv: IArgv) => {
  return new Promise((resolve, reject) => {
    const clientConfig = webpackClientConfig(argv);
    const clientCompiler = webpack(clientConfig);
    const devConfig = {
      publicPath: clientConfig.output && clientConfig.output.publicPath,
      noInfo: false,
      quiet: false,
      stats: 'minimal',
    };

    const devMiddleware = webpackDevMiddleware(clientCompiler, devConfig);
    const hotMiddleware = webpackHotMiddleware(clientCompiler);
    let isResolve = false;

    clientCompiler.hooks.done.tap('OutPutTemplateHtml', () => {
      const fsd = devMiddleware.fileSystem;
      const filePath = clientConfig.output
        ? path.join(clientConfig.output.path || '', 'public/index.html')
        : '';
      if (fsd.existsSync(filePath)) {
        const index = fsd.readFileSync(filePath, 'utf-8');
        const indexPath = paths.distPath(argv, 'public/index.html');
        fse.outputFileSync(indexPath, index, 'utf8');
      }

      if (!isResolve) {
        isResolve = true;
        console.log('watch client is running....');
        resolve([devMiddleware, hotMiddleware]);
      }
    });
  });
};
