const path = require('path')
const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [375, 640, 768, 828, 1024, 1440, 1920],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: '@import "mixins.scss";',
  },
}

module.exports = withNextIntl(nextConfig)
