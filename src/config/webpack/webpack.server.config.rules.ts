import { paths } from '../paths';
import { IArgv } from '../../interfaces/argv.interface';

export const webpackServerRules = (argv: IArgv): any[] => {
  return [
    {
      test: /\.(tsx?)|(js)$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      include: [paths.srcPath(argv, 'src')],
    },
    {
      test: /\.(tsx?)|(js)$/,
      loader: 'babel-loader',
      include: [paths.srcPath(argv, 'src')],
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              targets: {
                node: '8.12',
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
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: argv.dev ? 1024 * 100 : 1024 * 8,
        name: `public/static/images/[name]${argv.dev ? '' : '.[hash:8]'}.[ext]`,
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: argv.dev ? 1024 * 100 : 1024 * 8,
        name: `public/static/fonts/[name]${argv.dev ? '' : '.[hash:8]'}.[ext]`,
      },
    },
  ];
};
