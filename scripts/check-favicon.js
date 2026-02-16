const fs = require('fs');
const sizeOf = require('image-size');

const faviconPath = 'public/av_favicon.png';

try {
  const dimensions = sizeOf(faviconPath);
  console.log(`Favicon dimensions: ${dimensions.width}x${dimensions.height}`);
} catch (err) {
  console.error(err);
}
