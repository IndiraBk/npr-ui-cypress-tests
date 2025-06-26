const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.npr.org',
    chromeWebSecurity: false,
    pageLoadTimeout: 60000,

    viewportWidth: 1920,
    viewportHeight: 1080,
  },
}); 
