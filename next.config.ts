import type { NextConfig } from 'next';

// next.config.js
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProd ? '' : '',
  basePath: isProd ? '' : '',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      ...defaultPathMap,
      '/': { page: '/' },
      '/projects': { page: '/projects' },
      '/projects/geneticAlgorithm.html': {
        page: '/',
      },
    };
  },
};

export default nextConfig;
