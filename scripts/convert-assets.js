const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/sequence');
const outputDir = path.join(__dirname, '../public/sequence'); // Overwrite or same dir

async function convertToWebP() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNGs to convert...`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

    await sharp(inputPath)
      .webp({ quality: 80 }) // Good balance for frame sequences
      .toFile(outputPath);
      
    // Delete original PNG to save space? User asked to remove unused.
    fs.unlinkSync(inputPath);
    console.log(`Converted & Deleted: ${file}`);
  }
}

convertToWebP();
