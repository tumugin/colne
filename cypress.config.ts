import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/dist/plugins'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      initPlugin(on, config)
    },
  },
})
