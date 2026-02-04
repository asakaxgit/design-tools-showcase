/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages serves from /repository-name/
  basePath: process.env.NODE_ENV === 'production' ? '/design-tools-showcase' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/design-tools-showcase/' : '',
}

module.exports = nextConfig
