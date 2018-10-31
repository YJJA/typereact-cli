"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = __importStar(require("fs-extra"));
const paths_1 = require("../config/paths");
exports.buildPackageFile = (argv) => {
    const packageJsonPath = paths_1.paths.srcPath(argv, 'package.json');
    const distPackageJsonPath = paths_1.paths.distPath(argv, 'package.json');
    return fse.copy(packageJsonPath, distPackageJsonPath);
};
