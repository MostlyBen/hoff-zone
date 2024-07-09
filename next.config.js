/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["next-mdx-remote"]
};

const withMDX = require("./mdx-loader")();
module.exports = withMDX(nextConfig);
