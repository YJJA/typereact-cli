declare module 'browser-sync' {
  class BrowserSync {
    init(options: any): void;
  }
  export const browserSync: { create: () => BrowserSync };
  export default browserSync;
}
