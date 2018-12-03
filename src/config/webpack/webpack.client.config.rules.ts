import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { paths } from '../paths';
import { IArgv } from '../../interfaces/argv.interface';
import { Rule } from 'webpack';

export const webpackClientRules = (argv: IArgv): Rule[] => {
  return [
    {
      test: /\.(tsx?)$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      include: [paths.srcPath(argv)],
    },
    {
      test: /\.(tsx?)|(js)$/,
      include: [paths.srcPath(argv)],
      loader: 'babel-loader',
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              modules: false,
              targets: {
                browsers: ['> 1%', 'last 4 versions', 'ie >= 9', 'Firefox ESR'],
              },
            },
          ],
          require.resolve('@babel/preset-react'),
          require.resolve('@babel/preset-typescript'),
        ],
        plugins: [
          require.resolve('@babel/plugin-transform-runtime'),
          require.resolve('@babel/plugin-proposal-object-rest-spread'),
          require.resolve('@babel/plugin-proposal-class-properties'),
          require.resolve('@babel/plugin-syntax-dynamic-import'),
          [
            require.resolve('babel-plugin-styled-components'),
            {
              ssr: true,
            },
          ],
          require.resolve('react-hot-loader/babel'),
          require.resolve('@loadable/babel-plugin'),
        ],
      },
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: argv.dev ? 1024 * 100 : 1024 * 8,
        name: `static/images/[name]${argv.dev ? '' : '.[hash:8]'}.[ext]`,
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: argv.dev ? 1024 * 100 : 1024 * 8,
        name: `static/fonts/[name]${argv.dev ? '' : '.[hash:8]'}.[ext]`,
      },
    },
  ];
};
