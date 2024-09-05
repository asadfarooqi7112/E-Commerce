/** @type {import('next').NextConfig} */
const nextConfig = {
 /* output: 'export',*/
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vqvruapmkpjwdrrhnzfr.supabase.co',
      },
    ],
  },
};

export default nextConfig;
