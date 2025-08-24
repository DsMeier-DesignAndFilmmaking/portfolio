const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    width = 1920,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

async function main() {
  const imagesDir = path.join(__dirname, '../public/images');
  
  // Optimize hero image
  await optimizeImage(
    path.join(imagesDir, 'me_heroImage-1_1.1.1.jpg'),
    path.join(imagesDir, 'me_heroImage-1_1.1.1.webp'),
    { width: 1920, quality: 85 }
  );
  
  // Optimize Morocco image
  await optimizeImage(
    path.join(imagesDir, 'Morocco_girlsBike_Natgeo.jpg'),
    path.join(imagesDir, 'Morocco_girlsBike_Natgeo.webp'),
    { width: 1200, quality: 80 }
  );
  
  // Create smaller versions for mobile
  await optimizeImage(
    path.join(imagesDir, 'me_heroImage-1_1.1.1.jpg'),
    path.join(imagesDir, 'me_heroImage-1_1.1.1-mobile.webp'),
    { width: 768, quality: 80 }
  );
  
  // Optimize earth-map texture (critical for 3D globe)
  await optimizeImage(
    path.join(imagesDir, 'textures/earth-map.jpg'),
    path.join(imagesDir, 'textures/earth-map.webp'),
    { width: 2048, quality: 85 }
  );
}

main().catch(console.error);
