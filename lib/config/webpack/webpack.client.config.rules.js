"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const paths_1 = require("../paths");
exports.webpackClientRules = (argv) => {
    return [
        {
            test: /\.(tsx?)$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            include: [paths_1.paths.srcPath(argv)],
        },
        {
            test: /\.(tsx?)|(js)$/,
            include: [paths_1.paths.srcPath(argv)],
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
                    require.resolve('react-loadable/babel'),
                ],
            },
        },
        {
            test: /\.css$/,
            use: [mini_css_extract_plugin_1.default.loader, 'css-loader'],
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
