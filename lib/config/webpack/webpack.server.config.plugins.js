"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const paths_1 = require("../paths");
exports.webpackServerPlugins = (argv) => {
    let plugins = [
        new fork_ts_checker_webpack_plugin_1.default({
            tsconfig: paths_1.paths.srcPath(argv, 'tsconfig.json'),
        }),
        new webpack_1.default.DefinePlugin({
            'process.env.RUNTIME_ENV': JSON.stringify('server'),
            'process.env.NODE_ENV': JSON.stringify(argv.dev ? 'development' : 'production'),
        }),
        new webpack_1.default.NormalModuleReplacementPlugin(/\/config\/(\w+)\.json$/, (resource) => {
            resource.request = resource.request.replace(/\/\w+\.json$/, `/${argv.env}.json`);
        }),
    ];
    if (argv.dev) {
        plugins = [
            ...plugins,
            new webpack_1.default.HotModuleReplacementPlugin(),
            new webpack_1.default.NamedModulesPlugin(),
        ];
    }
    return plugins;
};
