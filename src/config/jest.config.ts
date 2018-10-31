import * as path from 'path';

const resolve = (...args: string[]) => path.join(__dirname, 'jest', ...args);

export default {
  rootDir: '',
  collectCoverageFrom: [
    'packages/**/*.js',
    'src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  moduleNameMapper: {
    '.*\\.(css|scss|sass)$': 'identity-obj-proxy',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': resolve(
      'assetMock'
    ),
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: resolve('enzyme'),
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
