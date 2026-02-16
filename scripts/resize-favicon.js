const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function resizeFavicon() {
  const inputPath = path.join(__dirname, '../public/av_favicon.png');
  const outputPath = path.join(__dirname, '../public/favicon_32x32.png');

  try {
    const image = await loadImage(inputPath);
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext('2d');
    
    // Draw image to fit 32x32. Since 1792x1259 is ~1.42 aspect ratio, 
    // simply scaling to 32x32 will squat it a bit, but for an icon it might be okay.
    // Or we fit it within 32x32 preserving aspect ratio.
    // Let's preserve aspect ratio to avoid distortion "height is still more make it little short".
    // Actually, "make it little short" implies the current one looks tall?
    // 1792 wide by 1259 tall is WIDE, not tall. 
    // If the user says "height is still more", maybe they mean the visual size in the tab is too big?
    // Or maybe the browser is scaling it weirdly.
    // Standard favicons are square.
    // I will center the image in a 32x32 square transparent canvas.
    
    const scale = Math.min(32 / image.width, 32 / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    const x = (32 - w) / 2;
    const y = (32 - h) / 2;
    
    ctx.drawImage(image, x, y, w, h);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('Favicon resized to 32x32 PNG');
  } catch (err) {
    console.error(err);
  }
}

resizeFavicon();
