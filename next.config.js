/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-dnd'])

const nextConfig = {
  //   images: {
  //     domains: ['mdm-portal.nabatisnack.co.id'],
  //   },
  basePath: '/eds',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  typescript: { ignoreBuildErrors: true },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  devIndicators: { buildActivity: false },
}

module.exports = withTM(nextConfig)
