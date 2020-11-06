/* eslint-disable */
const withPWA = require("next-pwa");

module.exports = withPWA({
  crossOrigin: "anonymous",
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
});
