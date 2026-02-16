/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    // VERY IMPORTANT — prevents canvas from breaking tracing
    serverComponentsExternalPackages: ["canvas"],
    outputFileTracingExcludes: {
      "*": [
        "node_modules/canvas/**",
        "node_modules/sharp/**"
      ],
    },
  },
};

module.exports = nextConfig;
