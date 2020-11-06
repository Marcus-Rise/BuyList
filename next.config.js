/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NODE_ENV === "production",
});
const withOffline = require("next-offline");

module.exports = withOffline(
  withBundleAnalyzer({
    workboxOpts: { swDest: "_next/static/service-worker.js" },
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
  }),
);
