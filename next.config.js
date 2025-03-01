/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.chesscomfiles.com',
        port: '',
        pathname: '/uploads/v1/user/**'
      }
    ]
  }
};

export default nextConfig;
