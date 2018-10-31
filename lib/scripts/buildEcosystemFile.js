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
exports.buildEcosystemFile = (argv) => {
    const packageJson = require(paths_1.paths.srcPath(argv, 'package.json'));
    const app = {
        name: `${argv.prefix ? `${argv.prefix}-` : ''}${packageJson.name}`,
        script: `./index.js`,
        watch: false,
        instances: 1,
        node_args: '--harmony',
        exec_interpreter: 'node',
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        merge_logs: false,
        env: {
            NODE_ENV: argv.env,
        },
        error_file: `./logs/error/error.log`,
        out_file: `./logs/out/out.log`,
    };
    const dist = paths_1.paths.distPath(argv, 'ecosystem.json');
    return fse.outputJson(dist, { apps: [app] }, { spaces: 2 });
};
