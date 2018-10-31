/// ../types/browser-sync/index.d.ts
process.env.NODE_ENV = 'development';
/*
  start script
  */
import fse from 'fs-extra';
import browserSync from 'browser-sync';

import { paths } from './config/paths';
import { watchClient } from './scripts/watchClient';
import { watchServer } from './scripts/watchServer';
import { runServer } from './scripts/runServer';
import { IArgv } from './interfaces/argv.interface';

// start
export async function start(argvs: IArgv) {
  // 删除临时文件
  await fse.remove(paths.distPath(argvs));

  // 启动客户端编译服务
  const clientPromise = watchClient(argvs);

  // 启动服务端编译服务
  const serverpath = await watchServer(argvs);

  const serverPort = argvs.port - 1;
  const serverPromise = runServer(serverpath, {
    PORT: serverPort,
  });
  const [middleware] = await Promise.all([clientPromise, serverPromise]);

  // 启动代理服务
  const bs = browserSync.create();
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
}
