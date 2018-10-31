"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  watch client
 */
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
const paths_1 = require("../config/paths");
const webpack_client_config_1 = require("../config/webpack.client.config");
exports.watchClient = (argv) => {
    return new Promise((resolve, reject) => {
        const clientConfig = webpack_client_config_1.webpackClientConfig(argv);
        const clientCompiler = webpack_1.default(clientConfig);
        const devConfig = {
            publicPath: clientConfig.output && clientConfig.output.publicPath,
            noInfo: false,
            quiet: false,
            stats: 'minimal',
        };
        const devMiddleware = webpack_dev_middleware_1.default(clientCompiler, devConfig);
        const hotMiddleware = webpack_hot_middleware_1.default(clientCompiler);
        let isResolve = false;
        clientCompiler.hooks.done.tap('OutPutTemplateHtml', () => {
            const fsd = devMiddleware.fileSystem;
            const filePath = clientConfig.output
                ? path.join(clientConfig.output.path || '', 'public/index.html')
                : '';
            if (fsd.existsSync(filePath)) {
                const index = fsd.readFileSync(filePath, 'utf-8');
                const indexPath = paths_1.paths.distPath(argv, 'index.html');
                fs_extra_1.default.outputFileSync(indexPath, index, 'utf8');
            }
            if (!isResolve) {
                isResolve = true;
                console.log('watch client is running....');
                resolve([devMiddleware, hotMiddleware]);
            }
        });
    });
};
