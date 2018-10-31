import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { paths } from '../paths';
import { IArgv } from '../../interfaces/argv.interface';

export const webpackServerPlugins = (argv: IArgv): any => {
  let plugins = [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.srcPath(argv, 'tsconfig.json'),
    }),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': JSON.stringify('server'),
      'process.env.NODE_ENV': JSON.stringify(
        argv.dev ? 'development' : 'production'
      ),
    }),
    new webpack.NormalModuleReplacementPlugin(
      /\/config\/(\w+)\.json$/,
      (resource: any) => {
        resource.request = resource.request.replace(
          /\/\w+\.json$/,
          `/${argv.env}.json`
        );
      }
    ),
  ];

  if (argv.dev) {
    plugins = [
      ...plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ];
  }

  return plugins;
};
