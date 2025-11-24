import './src/env.mjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // skipTrailingSlashRedirect: true,
  // skipMiddlewareUrlNormalize: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/ecommerce',
  //       permanent: true,
  //     },
  //   ];
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.uplooder.net',
        // pathname: '/img/image/**',
      },
      {
        protocol: 'http',
        hostname: 'foodkeys-api-dev:8080',
      },
      {
        protocol: 'http',
        hostname: 'foodkeys-api-dev',
        port: '8080',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'www.back.agfo.ir',
        port: '80',
        pathname: '/files/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/files/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000'
      },
      {
        protocol: 'http',
        hostname: 'foodkeys-userpanel-dev',
        port: '3000'
      },
      {
        protocol: 'http',
        hostname: 'foodkeys-userpanel-dev:3000'
      },
      {
        protocol: 'https',
        hostname: 'panel.agfo.ir',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Authorization, Content-Type',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
