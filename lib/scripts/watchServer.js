'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  watch client
 */
const webpack_1 = __importDefault(require("webpack"));
const path_1 = __importDefault(require("path"));
const webpack_server_config_1 = require("../config/webpack.server.config");
// watchServer
exports.watchServer = (argv) => {
    return new Promise((resolve, reject) => {
        const serverConfig = webpack_server_config_1.webpackServerConfig(argv);
        const serverCompiler = webpack_1.default(serverConfig);
        const serverPath = serverConfig.output
            ? path_1.default.join(serverConfig.output.path || '', serverConfig.output.filename || '')
            : '';
        let isResolve = false;
        serverCompiler.watch({
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/,
        }, (error, stats) => {
            if (error) {
                reject(error);
                return;
            }
            if (!isResolve) {
                isResolve = true;
                console.log('watch server is watching....');
                resolve(serverPath);
            }
            const statsJson = stats.toJson();
            statsJson.errors.forEach((err) => console.error(err));
            statsJson.warnings.forEach((err) => console.warn(err));
        });
    });
};
