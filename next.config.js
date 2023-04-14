/** @type {import('next').NextConfig} */

const intercept = require("intercept-stdout");
const runtimeCaching = require("./cache");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
});

function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  return text;
}
intercept(interceptStdout);

const nextConfig = withPWA({
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});

module.exports = nextConfig;
