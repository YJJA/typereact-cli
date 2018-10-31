/*
  webpack server config
 */
import { webpackServerRules } from './webpack/webpack.server.config.rules';
import { webpackServerPlugins } from './webpack/webpack.server.config.plugins';
import { paths } from './paths';
import { IArgv } from '../interfaces/argv.interface';
import { Configuration } from 'webpack';

// webpack server config
export const webpackServerConfig = (argv: IArgv): Configuration => {
  const packageJson = require(paths.srcPath(argv, 'package.json'));

  return {
    entry: argv.dev
      ? [paths.srcPath(argv, `src/index`), 'webpack/hot/poll?1000']
      : paths.srcPath(argv, `src/index`),
    mode: argv.dev ? 'development' : 'production',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    output: {
      path: paths.distPath(argv),
      publicPath: '/',
      filename: 'index.js',
      libraryTarget: 'commonjs',
      chunkFilename: `server/[name].js`,
    },
    optimization: {
      minimizer: [],
    },
    externals: Object.keys(packageJson.dependencies),
    target: 'node',
    module: {
      rules: webpackServerRules(argv),
    },
    plugins: webpackServerPlugins(argv),
    context: __dirname,
    node: {
      __filename: false,
      __dirname: false,
    },
    devtool: argv.dev ? 'cheap-module-source-map' : false,
  };
};
