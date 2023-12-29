/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Add loader for MP3 files
        config.module.rules.push({
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/_next/static/sounds/',
                outputPath: 'static/sounds/',
                esModule: false,
              },
            },
          ],
        });
      }
  
      return config;
    },
  };

module.exports = nextConfig
