/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: true,
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
});
