/*
  webpack client config
 */
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { paths } from './paths';
import { webpackClientRules } from './webpack/webpack.client.config.rules';
import { webpackClientPlugins } from './webpack/webpack.client.config.plugins';
import { IArgv } from '../interfaces/argv.interface';
import { Configuration } from 'webpack';

export const webpackClientConfig = (argv: IArgv): Configuration => {
  return {
    mode: argv.dev ? 'development' : 'production',
    entry: argv.dev
      ? [
          'webpack-hot-middleware/client?reload=true',
          paths.srcPath(argv, 'src/client'),
        ]
      : paths.srcPath(argv, 'src/client'),
    output: {
      path: paths.distPath(argv, 'public'),
      publicPath: '/',
      filename: `static/scripts/[name]${argv.dev ? '' : '.[contenthash]'}.js`,
      chunkFilename: `static/scripts/[name]${
        argv.dev ? '' : '.[contenthash]'
      }.js`,
    },
    optimization: argv.dev
      ? undefined
      : {
          splitChunks: {
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/][\w\W]+\.js$/,
                name: 'vendors',
                chunks: 'all',
              },
              styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
              },
            },
          },
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
              cache: true,
              parallel: true,
              sourceMap: true, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin(),
          ],
        },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: webpackClientRules(argv),
    },
    plugins: webpackClientPlugins(argv),
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    cache: argv.dev,
    target: 'web',
    devtool: argv.dev ? 'cheap-module-source-map' : 'source-map',
  };
};
