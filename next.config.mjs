/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages (ES6 syntax) that depend on `window`
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //   }
  //
  //   config.module.rules.push({
  //     test: /\.js$/,
  //     include: /node_modules[\/\\]@mapbox[\/\\]tiny-sdf/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: ['@babel/preset-env'],
  //       },
  //     },
  //   });
  //
  //   return config;
  // },
  //
  experimental: {esmExternals: 'loose'},
  reactStrictMode: false
}

export default nextConfig