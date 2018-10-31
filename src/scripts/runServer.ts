/*
  run server
 */
import spawn from 'cross-spawn';
import { ChildProcess } from 'child_process';

let server: ChildProcess;

export function runServer(serverPath: string, env: { [key: string]: any }) {
  return new Promise((resolve, reject) => {
    if (server) {
      server.kill('SIGTERM');
    }

    server = spawn('node', [serverPath], {
      env: { ...process.env, ...env },
    });

    let isResolve = false;
    const serverStdoutHandle = (data: any) => {
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

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});
