const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '../public/sequence');
const outputStart = path.join(__dirname, '../src/app/sequence-manifest.json');

fs.readdir(sequenceDir, (err, files) => {
  if (err) {
    console.error('Error reading sequence directory:', err);
    process.exit(1);
  }

  const imageFiles = files
    .filter(file => file.endsWith('.webp'))
    .sort(); // Ensure alphabetical sort

  const manifest = {
    frames: imageFiles
  };

  fs.writeFileSync(outputStart, JSON.stringify(manifest, null, 2));
  console.log(`Manifest generated with ${imageFiles.length} WebP frames.`);
});
