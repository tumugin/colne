import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  sentry: {
    hideSourceMaps: true,
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
