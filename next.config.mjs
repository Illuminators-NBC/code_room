/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      { hostname: 'cdn.pixabay.com' }
    ]
  }
};
export default nextConfig;
