const nextConfig = {
  // output: "standalone", // Removed to prevent "Maximum call stack size exceeded" on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
