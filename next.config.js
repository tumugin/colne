const withTranspileModules = require("next-transpile-modules")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = () => {
  const plugins = [withTranspileModules(["@cloudscape-design/components"])]
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig)
}
