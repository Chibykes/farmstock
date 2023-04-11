/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', "firebasestorage.googleapis.com"],
  },
}

const withPWA = require('next-pwa')({ dest: 'public' })
module.exports = withPWA(nextConfig)
