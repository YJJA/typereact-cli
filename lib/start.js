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
/// ../types/browser-sync/index.d.ts
process.env.NODE_ENV = 'development';
/*
  start script
  */
const fs_extra_1 = __importDefault(require("fs-extra"));
const browser_sync_1 = __importDefault(require("browser-sync"));
const paths_1 = require("./config/paths");
const watchClient_1 = require("./scripts/watchClient");
const watchServer_1 = require("./scripts/watchServer");
const runServer_1 = require("./scripts/runServer");
// start
function start(argvs) {
    return __awaiter(this, void 0, void 0, function* () {
        // 删除临时文件
        yield fs_extra_1.default.remove(paths_1.paths.distPath(argvs));
        // 启动客户端编译服务
        const clientPromise = watchClient_1.watchClient(argvs);
        // 启动服务端编译服务
        const serverpath = yield watchServer_1.watchServer(argvs);
        const serverPort = argvs.port - 1;
        const serverPromise = runServer_1.runServer(serverpath, {
            PORT: serverPort,
        });
        const [middleware] = yield Promise.all([clientPromise, serverPromise]);
        // 启动代理服务
        const bs = browser_sync_1.default.create();
        bs.init({
            port: argvs.port,
            notify: false,
            open: false,
            ui: false,
            proxy: {
                target: `http://localhost:${serverPort}`,
                middleware,
                proxyOptions: {
                    xfwd: true,
                },
            },
        });
    });
}
exports.start = start;
