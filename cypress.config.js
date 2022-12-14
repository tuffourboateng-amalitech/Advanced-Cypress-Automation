const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  viewportWidth: 1000,
  viewportHeight: 600,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: ['**/cypress/e2e/1-getting-started', '**/cypress/e2e/2-advanced-examples'],
    baseUrl: 'https://demoqa.com'
  },
});
