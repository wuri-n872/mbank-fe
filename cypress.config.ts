import { defineConfig } from 'cypress'

export default defineConfig({
  // the default port is 8080
  port: 8010,

  // end-to-end testing config
  e2e: {
    baseUrl: 'http://localhost:3080',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    specPattern: ['cypress/integration/**/*.feature'],
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 900,
  },

  // component testing config
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
})
