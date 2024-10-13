/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'assets.aceternity.com' },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/my-account/**',
      },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
  },
}

export default config
