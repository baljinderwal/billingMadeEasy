/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  },
}

module.exports = nextConfig
