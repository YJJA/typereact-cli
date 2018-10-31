"use strict";
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
const jest_config_1 = __importDefault(require("./config/jest.config"));
const paths_1 = require("./config/paths");
function test(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        jest_config_1.default.rootDir = paths_1.paths.srcPath(argv);
        const argvs = process.argv.slice(argv.workspace ? 4 : 3);
        argvs.push('--config', JSON.stringify(jest_config_1.default));
        require('jest').run(argvs);
    });
}
exports.test = test;
