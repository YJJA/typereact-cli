import webpack, { Plugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { IArgv } from '../../interfaces/argv.interface';
import { paths } from '../paths';

export const webpackClientPlugins = (argv: IArgv): any[] => {
  let plugins: any[] = [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.srcPath(argv, 'tsconfig.json'),
    }),
    new HtmlWebpackPlugin({
      filename: argv.dev ? 'public/index.html' : './index.html',
      template: paths.srcPath(argv, 'src/index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: argv.dev,
    }),
    new CopyWebpackPlugin([
      {
        from: paths.srcPath(argv, 'src/public'),
        to: '',
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': JSON.stringify('client'),
      'process.env.NODE_ENV': JSON.stringify(
        argv.dev ? 'development' : 'production'
      ),
    }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename:
        `static/styles/[name]${argv.dev ? '' : '.[contenthash]'}` + '.css',
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
    // new BundleAnalyzerPlugin()
  ];

  if (argv.dev) {
    plugins = [...plugins, new webpack.HotModuleReplacementPlugin()];
  } else {
    plugins = [
      ...plugins,
      new CompressionPlugin({
        test: /\.(js|css)$/,
      }),
    ];
  }

  return plugins;
};
