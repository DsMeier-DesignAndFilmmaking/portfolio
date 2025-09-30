#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const QUALITY = 85;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 75;

// Responsive breakpoints
const BREAKPOINTS = [
  { width: 640, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1280, suffix: '-xl' },
  { width: 1920, suffix: '-2xl' },
];

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, width, quality, format = 'jpeg') {
  try {
    let pipeline = sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality, progressive: true, mozjpeg: true });

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality: WEBP_QUALITY, effort: 6 });
    } else if (format === 'avif') {
      pipeline = pipeline.avif({ quality: AVIF_QUALITY, effort: 9 });
    }

    await pipeline.toFile(outputPath);
    console.log(`✓ Optimized: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function processImage(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const ext = path.extname(filePath);
  
  // Skip if already processed
  if (fileName.includes('-sm') || fileName.includes('-md') || fileName.includes('-lg')) {
    return;
  }

  console.log(`\nProcessing: ${fileName}${ext}`);

  // Original optimized version
  await optimizeImage(
    filePath,
    path.join(OUTPUT_DIR, `${fileName}.jpg`),
    null,
    QUALITY
  );

  // WebP version
  await optimizeImage(
    filePath,
    path.join(OUTPUT_DIR, `${fileName}.webp`),
    null,
    WEBP_QUALITY,
    'webp'
  );

  // AVIF version
  await optimizeImage(
    filePath,
    path.join(OUTPUT_DIR, `${fileName}.avif`),
    null,
    AVIF_QUALITY,
    'avif'
  );

  // Responsive versions
  for (const breakpoint of BREAKPOINTS) {
    // JPEG responsive
    await optimizeImage(
      filePath,
      path.join(OUTPUT_DIR, `${fileName}${breakpoint.suffix}.jpg`),
      breakpoint.width,
      QUALITY
    );

    // WebP responsive
    await optimizeImage(
      filePath,
      path.join(OUTPUT_DIR, `${fileName}${breakpoint.suffix}.webp`),
      breakpoint.width,
      WEBP_QUALITY,
      'webp'
    );

    // AVIF responsive
    await optimizeImage(
      filePath,
      path.join(OUTPUT_DIR, `${fileName}${breakpoint.suffix}.avif`),
      breakpoint.width,
      AVIF_QUALITY,
      'avif'
    );
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  try {
    const files = fs.readdirSync(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file) && 
      !file.includes('optimized')
    );

    console.log(`Found ${imageFiles.length} images to optimize\n`);

    for (const file of imageFiles) {
      const filePath = path.join(INPUT_DIR, file);
      await processImage(filePath);
    }

    console.log('\n✅ Image optimization complete!');
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
    
    // Generate manifest file
    const manifest = {
      generated: new Date().toISOString(),
      totalImages: imageFiles.length,
      formats: ['jpg', 'webp', 'avif'],
      breakpoints: BREAKPOINTS.map(bp => bp.width),
      quality: {
        jpeg: QUALITY,
        webp: WEBP_QUALITY,
        avif: AVIF_QUALITY
      }
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('📋 Generated manifest.json');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Check if sharp is available
try {
  require('sharp');
  main();
} catch (error) {
  console.error('❌ Sharp is not installed. Please run: npm install sharp');
  process.exit(1);
}