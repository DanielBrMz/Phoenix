/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import("./src/env.mjs");

import {default as TM} from 'next-transpile-modules' ;

const withTM = TM(['kepler.gl', 'd3-shape'])

/** @type {import("next").NextConfig} */
const config = withTM({
  webpack: (config, options) => {
    return config
  },
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: { esmExternals: 'loose' },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

export default config;
