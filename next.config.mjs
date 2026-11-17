import sentryConfig from '@sentry/nextjs/config'

const { withSentryConfig } = sentryConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [
    '@cloudscape-design/components',
    '@cloudscape-design/design-tokens',
    '@cloudscape-design/component-toolkit',
  ],
}

const exportConfig = process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, {
      silent: true,
    })
  : nextConfig

export default exportConfig
