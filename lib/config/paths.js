"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const workPath = process.cwd();
// temp build dirname
exports.paths = {
    workPath(...args) {
        return path_1.default.join(workPath, ...args);
    },
    distPath(argv, ...args) {
        const workspace = argv.workspace ? `packages/${argv.workspace}` : '';
        return argv.dev
            ? this.workPath(workspace, `node_modules/.temp`, ...args)
            : this.workPath(workspace, `dist`, ...args);
    },
    srcPath(argv, ...args) {
        const workspace = argv.workspace ? `packages/${argv.workspace}` : '';
        return this.workPath(workspace, ...args);
    },
};
