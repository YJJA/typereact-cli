'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  build script
 */
const webpack_1 = __importDefault(require("webpack"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const paths_1 = require("./config/paths");
const webpack_client_config_1 = require("./config/webpack.client.config");
const webpack_server_config_1 = require("./config/webpack.server.config");
const buildEcosystemFile_1 = require("./scripts/buildEcosystemFile");
const buildPackageFile_1 = require("./scripts/buildPackageFile");
// build
function build(argvs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_extra_1.default.remove(paths_1.paths.distPath(argvs));
        const serverConfig = webpack_server_config_1.webpackServerConfig(argvs);
        const clientConfig = webpack_client_config_1.webpackClientConfig(argvs);
        yield runWebpack([serverConfig, clientConfig]);
        yield buildEcosystemFile_1.buildEcosystemFile(argvs);
        yield buildPackageFile_1.buildPackageFile(argvs);
    });
}
exports.build = build;
// webpack build
function runWebpack(webpackConfig) {
    return new Promise((resolve, reject) => {
        const compiler = webpack_1.default(webpackConfig);
        // compiler.apply(new ProgressPlugin())
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                info.warnings.forEach((err) => console.error(err));
            }
            if (stats.hasWarnings()) {
                info.warnings.forEach((err) => console.warn(err + '\n'));
            }
            process.stdout.write(stats.toString({
                chunks: false,
                colors: true,
            }));
            resolve();
        });
    });
}
