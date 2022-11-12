const withTranspileModules = require('next-transpile-modules')
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = () => {
  const plugins = [
    withTranspileModules([
      '@cloudscape-design/components',
      '@cloudscape-design/design-tokens',
    ]),
    (config) =>
      process.env.NEXT_PUBLIC_SENTRY_DSN
        ? withSentryConfig(config, {
            silent: true,
            hideSourceMaps: true,
          })
        : config,
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig)
}
