/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = false;
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
