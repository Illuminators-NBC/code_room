/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**'
      },
      { hostname: 'cdn.pixabay.com' },
      { hostname: 'pdgwrjxbqywcmuxwjqos.supabase.co' }
    ]
  }
};

export default nextConfig;
