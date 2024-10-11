/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  swcMinify: false,
  productionBrowserSourceMaps: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = false;
      config.optimization.minimizer = [];
    }
    return config;
  },
};

export default nextConfig;


// TODO: USE THIS TO ENABLE MINIFICATION

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     compiler: {
//       emotion: true,
//     },
//   };

//   export default nextConfig;
