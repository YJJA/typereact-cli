
declare module 'terser-webpack-plugin' {
  import { Plugin } from 'webpack';
  import {MinifyOptions} from 'terser'

  interface TerserPluginOptions {
    test?: string | RegExp | Array<string | RegExp>;
    include?: string | RegExp | Array<string | RegExp>;
    exclude?: string | RegExp | Array<string | RegExp>;
    chunkFilter?(chunk: any): boolean;
    cache?: string | boolean;
    cacheKeys?(defaultCacheKeys: Object, file: any): Object;
    parallel?: number | boolean;
    sourceMap?: boolean;
    minify?(file: any, sourceMap: any): any;
    terserOptions?: MinifyOptions;
    extractComments?: boolean | string | RegExp;
    warningsFilter?(warning: any, source: any): boolean;
  }

  class TerserPlugin extends Plugin {
    constructor(options?: TerserPluginOptions)
  }

  export default TerserPlugin
}
