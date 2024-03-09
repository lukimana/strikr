/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strikr.pro',
        port: ''
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000'
      },
      {
        protocol: 'https',
        hostname: 'testing.strikr.pro',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'omegastrikers.wiki.gg',
        port: ''
      },
    ],
  }
}

module.exports = nextConfig
