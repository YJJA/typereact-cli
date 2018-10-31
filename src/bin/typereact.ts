#!/usr/bin/env node

import yargs from 'yargs';
import { build } from '../build';
import { start } from '../start';
import { test } from '../test';

const argv = yargs
  .command({
    command: 'start [workspace]',
    describe: '运行开发环境，[workspace]为可选的工作区',
    handler: argv => {
      if (argv.workspace) {
        console.log(`正在运行开发环境[${argv.workspace}]`);
      } else {
        console.log(`正在运行开发环境...`);
      }
    },
  })
  .command({
    command: 'build [workspace]',
    describe: '打包项目，[workspace]为可选的工作区',
    handler: argv => {
      if (argv.workspace) {
        console.log(`正在打包项目[${argv.workspace}]`);
      } else {
        console.log(`正在打包项目...`);
      }
    },
  })
  .command({
    command: 'test [workspace]',
    describe: '测试项目，[workspace]为可选的工作区',
    handler: argv => {
      if (argv.workspace) {
        console.log(`正在测试项目[${argv.workspace}]`);
      } else {
        console.log(`正在测试项目...`);
      }
    },
  })
  .demandCommand(1, '必需提供有效的命令')
  .option('env', {
    default: 'development',
    choices: ['development', 'test', 'production'],
    type: 'string',
    desc: '运行/打包环境',
  })
  .option('port', {
    default: 3000,
    type: 'number',
    desc: '运行/打包端口号',
  })
  .version('version', '查看版本', '0.1.0')
  .help('help', '查看帮助').argv;

const command = argv._[0];

if (command === 'start') {
  start({
    workspace: argv.workspace,
    env: argv.env,
    port: argv.port,
    dev: argv.env === 'development',
  }).catch((err: any) => {
    console.error(err);
  });
} else if (command === 'build') {
  build({
    workspace: argv.workspace,
    env: argv.env,
    port: argv.port,
    dev: false,
  }).catch((err: any) => {
    console.error(err);
  });
} else if (command === 'test') {
  test({
    workspace: argv.workspace,
    env: argv.env,
    port: argv.port,
    dev: false,
  }).catch((err: any) => {
    console.error(err);
  });
} else {
  yargs.showHelp();
}
