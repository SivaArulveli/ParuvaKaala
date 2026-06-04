/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: isProd ? '/ParuvaKaala' : '',
  assetPrefix: isProd ? '/ParuvaKaala/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
