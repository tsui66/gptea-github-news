/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    scrollRestoration: true,
  },
  compiler: { styledComponents: true },
}

module.exports = nextConfig