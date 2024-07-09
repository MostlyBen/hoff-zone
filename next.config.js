/** @type {import('next').NextConfig} */
const nextConfig = {
  appDir: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
  }
};

const withMDX = require("./mdx-loader")();
module.exports = withMDX(nextConfig);
