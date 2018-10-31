"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const resolve = (...args) => path.join(__dirname, 'jest', ...args);
exports.default = {
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
        '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': resolve('assetMock'),
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupTestFrameworkScriptFile: resolve('enzyme'),
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
