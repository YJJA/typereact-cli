"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_config_1 = __importDefault(require("./config/jest.config"));
const paths_1 = require("./config/paths");
async function test(argv) {
    jest_config_1.default.rootDir = paths_1.paths.srcPath(argv);
    const argvs = process.argv.slice(argv.workspace ? 4 : 3);
    argvs.push('--config', JSON.stringify(jest_config_1.default));
    require('jest').run(argvs);
}
exports.test = test;
