"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  run server
 */
const cross_spawn_1 = __importDefault(require("cross-spawn"));
let server;
function runServer(serverPath, env) {
    return new Promise((resolve, reject) => {
        if (server) {
            server.kill('SIGTERM');
        }
        server = cross_spawn_1.default('node', [serverPath], {
            env: Object.assign({}, process.env, env),
        });
        let isResolve = false;
        const serverStdoutHandle = (data) => {
            if (!isResolve) {
                console.log('server is running...');
                const str = data.toString('utf8');
                const result = str.match(/Listening on port (\d{4})/);
                if (result) {
                    isResolve = true;
                    return resolve(result[1]);
                }
            }
            process.stdout.write(data);
        };
        server.stdout.on('data', data => serverStdoutHandle(data));
        server.stderr.on('data', err => process.stderr.write(err));
    });
}
exports.runServer = runServer;
process.on('exit', () => {
    if (server) {
        server.kill('SIGTERM');
    }
});
