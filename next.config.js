const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [375, 640, 768, 828, 1024, 1440, 1920],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: '@import "mixins.scss";',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shows',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
