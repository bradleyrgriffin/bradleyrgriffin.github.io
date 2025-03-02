import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.bradleyrgriffin.me',
    supportFile: 'cypress/support/index.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
  retries: {
    runMode: 2,
    openMode: 1,
  },
});
