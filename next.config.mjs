/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pdgwrjxbqywcmuxwjqos.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/Images/**'
      }
    ]
  }
};
