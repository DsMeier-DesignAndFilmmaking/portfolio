const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for single image optimization
const INPUT_FILE = 'TravelApp_FIgma-UXPilot_1.png';
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const QUALITY = 85;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 75;

// Responsive breakpoints
const BREAKPOINTS = [
  { name: 'sm', width: 640 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 1024 },
  { name: 'xl', width: 1280 },
  { name: '2xl', width: 1536 },
];

async function optimizeSingleImage() {
  const inputPath = path.join(INPUT_DIR, INPUT_FILE);
  
  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ Image not found: ${inputPath}`);
    console.log('Please make sure the image file exists in the public/images directory.');
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const baseName = path.basename(INPUT_FILE, path.extname(INPUT_FILE));
  const outputBase = path.join(OUTPUT_DIR, baseName);

  console.log(`🚀 Optimizing: ${INPUT_FILE}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`📐 Original dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`💾 Original size: ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)} MB`);

    const optimizeAndSave = async (img, format, quality, suffix = '') => {
      let outputFilePath;
      let formatName;
      
      if (format === 'jpeg') {
        outputFilePath = `${outputBase}${suffix}.jpg`;
        formatName = 'JPEG';
        await img.jpeg({ quality: quality, progressive: true }).toFile(outputFilePath);
      } else if (format === 'webp') {
        outputFilePath = `${outputBase}${suffix}.webp`;
        formatName = 'WebP';
        await img.webp({ quality: quality }).toFile(outputFilePath);
      } else if (format === 'avif') {
        outputFilePath = `${outputBase}${suffix}.avif`;
        formatName = 'AVIF';
        await img.avif({ quality: quality }).toFile(outputFilePath);
      }
      
      const fileSize = (fs.statSync(outputFilePath).size / 1024 / 1024).toFixed(2);
      console.log(`✓ ${formatName}: ${path.basename(outputFilePath)} (${fileSize} MB)`);
      
      return path.relative(path.join(__dirname, '../public'), outputFilePath);
    };

    // Original size optimization
    console.log('\n📦 Creating original size variants...');
    await optimizeAndSave(image.clone(), 'jpeg', QUALITY);
    await optimizeAndSave(image.clone(), 'webp', WEBP_QUALITY);
    await optimizeAndSave(image.clone(), 'avif', AVIF_QUALITY);

    // Responsive sizes optimization
    console.log('\n📱 Creating responsive variants...');
    for (const breakpoint of BREAKPOINTS) {
      if (metadata.width && metadata.width > breakpoint.width) {
        const resizedImage = image.clone().resize(breakpoint.width);
        console.log(`\n${breakpoint.name.toUpperCase()} (${breakpoint.width}px):`);
        await optimizeAndSave(resizedImage.clone(), 'jpeg', QUALITY, `-${breakpoint.name}`);
        await optimizeAndSave(resizedImage.clone(), 'webp', WEBP_QUALITY, `-${breakpoint.name}`);
        await optimizeAndSave(resizedImage.clone(), 'avif', AVIF_QUALITY, `-${breakpoint.name}`);
      }
    }

    console.log('\n✅ Single image optimization complete!');
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('\n💡 Usage in your code:');
    console.log(`<Image src="/portfolio/images/optimized/${baseName}.webp" alt="..." />`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${INPUT_FILE}:`, error);
  }
}

optimizeSingleImage();
