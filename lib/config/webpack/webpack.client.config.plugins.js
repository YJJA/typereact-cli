"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const compression_webpack_plugin_1 = __importDefault(require("compression-webpack-plugin"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const webpack_plugin_1 = __importDefault(require("@loadable/webpack-plugin"));
const paths_1 = require("../paths");
exports.webpackClientPlugins = (argv) => {
    let plugins = [
        new fork_ts_checker_webpack_plugin_1.default({
            tsconfig: paths_1.paths.srcPath(argv, 'tsconfig.json'),
        }),
        new html_webpack_plugin_1.default({
            filename: argv.dev ? 'public/index.html' : './index.html',
            template: paths_1.paths.srcPath(argv, 'src/index.html'),
        }),
        new webpack_1.default.LoaderOptionsPlugin({
            debug: argv.dev,
        }),
        new copy_webpack_plugin_1.default([
            {
                from: paths_1.paths.srcPath(argv, 'src/public'),
                to: '',
            },
        ]),
        new webpack_1.default.DefinePlugin({
            'process.env.RUNTIME_ENV': JSON.stringify('client'),
            'process.env.NODE_ENV': JSON.stringify(argv.dev ? 'development' : 'production'),
        }),
        new webpack_plugin_1.default(),
        new mini_css_extract_plugin_1.default({
            filename: `static/styles/[name]${argv.dev ? '' : '.[contenthash]'}` + '.css',
        }),
        new webpack_1.default.NormalModuleReplacementPlugin(/\/config\/(\w+)\.json$/, (resource) => {
            resource.request = resource.request.replace(/\/\w+\.json$/, `/${argv.env}.json`);
        }),
    ];
    if (argv.dev) {
        plugins = [...plugins, new webpack_1.default.HotModuleReplacementPlugin()];
    }
    else {
        plugins = [
            ...plugins,
            new compression_webpack_plugin_1.default({
                test: /\.(js|css)$/,
            }),
        ];
    }
    return plugins;
};
