"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  webpack client config
 */
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
const paths_1 = require("./paths");
const webpack_client_config_rules_1 = require("./webpack/webpack.client.config.rules");
const webpack_client_config_plugins_1 = require("./webpack/webpack.client.config.plugins");
exports.webpackClientConfig = (argv) => {
    return {
        mode: argv.dev ? 'development' : 'production',
        entry: argv.dev
            ? [
                'webpack-hot-middleware/client?reload=true',
                paths_1.paths.srcPath(argv, 'src/client'),
            ]
            : paths_1.paths.srcPath(argv, 'src/client'),
        output: {
            path: paths_1.paths.distPath(argv, 'public'),
            publicPath: '/',
            filename: `static/scripts/[name]${argv.dev ? '' : '.[contenthash]'}.js`,
            chunkFilename: `static/scripts/[name]${argv.dev ? '' : '.[contenthash]'}.js`,
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
                    new terser_webpack_plugin_1.default({
                        terserOptions: {
                            compress: {
                                drop_console: true,
                            },
                        },
                        cache: true,
                        parallel: true,
                        sourceMap: true,
                    }),
                    new optimize_css_assets_webpack_plugin_1.default(),
                ],
            },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        module: {
            rules: webpack_client_config_rules_1.webpackClientRules(argv),
        },
        plugins: webpack_client_config_plugins_1.webpackClientPlugins(argv),
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
