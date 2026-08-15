const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', 'storybook-dark-mode'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
}

export default config
