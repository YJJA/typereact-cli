"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  webpack server config
 */
const webpack_server_config_rules_1 = require("./webpack/webpack.server.config.rules");
const webpack_server_config_plugins_1 = require("./webpack/webpack.server.config.plugins");
const paths_1 = require("./paths");
// webpack server config
exports.webpackServerConfig = (argv) => {
    const packageJson = require(paths_1.paths.srcPath(argv, 'package.json'));
    return {
        entry: argv.dev
            ? [paths_1.paths.srcPath(argv, `src/index`), 'webpack/hot/poll?1000']
            : paths_1.paths.srcPath(argv, `src/index`),
        mode: argv.dev ? 'development' : 'production',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        output: {
            path: paths_1.paths.distPath(argv),
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
            rules: webpack_server_config_rules_1.webpackServerRules(argv),
        },
        plugins: webpack_server_config_plugins_1.webpackServerPlugins(argv),
        context: __dirname,
        node: {
            __filename: false,
            __dirname: false,
        },
        devtool: argv.dev ? 'cheap-module-source-map' : false,
    };
};
