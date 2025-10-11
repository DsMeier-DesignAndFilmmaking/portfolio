#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for mobile screenshots
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/mobile-screenshots');
const MAX_WIDTH = 600; // Max width for retina quality (iPhone screenshots)
const WEBP_QUALITY = 85; // High quality for sharp mobile UI

// Expected simulator screenshot files (without extensions)
const SCREENSHOTS = [
  {
    input: 'Simulator Screenshot - iPhone 17 - 2025-10-05 at 09.44.52',
    output: 'simulator-2025-10-05-09-44-52'
  },
  {
    input: 'Simulator Screenshot - iPhone 17 - 2025-09-28 at 17.08.56',
    output: 'simulator-2025-09-28-17-08-56'
  },
  {
    input: 'Simulator Screenshot - iPhone 17 - 2025-09-29 at 16.53.12',
    output: 'simulator-2025-09-29-16-53-12'
  },
  {
    input: 'Simulator Screenshot - iPhone 17 - 2025-10-04 at 13.04.38',
    output: 'simulator-2025-10-04-13-04-38'
  },
  {
    input: 'Simulator Screenshot - iPhone 17 - 2025-10-07 at 22.01.21',
    output: 'simulator-2025-10-07-22-01-21'
  }
];

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

async function optimizeScreenshot(inputPath, outputName) {
  try {
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.webp`);
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}`);
    
    // Optimize to WebP with max width constraint
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: WEBP_QUALITY,
        effort: 6 // Balance between compression and speed
      })
      .toFile(outputPath);
    
    // Get output file size
    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`  ✓ Optimized: ${outputName}.webp (${sizeMB} MB)`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return false;
  }
}

async function findInputFile(baseName) {
  const extensions = ['.png', '.PNG', '.jpg', '.jpeg', '.JPG', '.JPEG'];
  
  for (const ext of extensions) {
    const filePath = path.join(INPUT_DIR, baseName + ext);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

async function main() {
  console.log('🚀 Optimizing mobile screenshots...\n');
  console.log(`Max Width: ${MAX_WIDTH}px (retina quality)`);
  console.log(`Quality: ${WEBP_QUALITY}%\n`);

  let successCount = 0;
  let notFoundCount = 0;

  for (const screenshot of SCREENSHOTS) {
    console.log(`Processing: ${screenshot.input}`);
    
    const inputPath = await findInputFile(screenshot.input);
    
    if (!inputPath) {
      console.log(`  ⚠ File not found. Please add this file to ${INPUT_DIR}`);
      notFoundCount++;
      continue;
    }
    
    const success = await optimizeScreenshot(inputPath, screenshot.output);
    if (success) successCount++;
    console.log('');
  }

  console.log('═══════════════════════════════════════');
  console.log(`✅ Optimization complete!`);
  console.log(`   Processed: ${successCount}/${SCREENSHOTS.length}`);
  if (notFoundCount > 0) {
    console.log(`   ⚠ Not found: ${notFoundCount}`);
  }
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log('═══════════════════════════════════════\n');

  if (notFoundCount > 0) {
    console.log('📋 Missing files:');
    console.log('Please add the following simulator screenshots to the public/images folder:');
    for (const screenshot of SCREENSHOTS) {
      const inputPath = await findInputFile(screenshot.input);
      if (!inputPath) {
        console.log(`  - ${screenshot.input}.png`);
      }
    }
    console.log('\nThen run this script again.\n');
  }
}

// Check if sharp is available
try {
  require('sharp');
  main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
} catch (error) {
  console.error('❌ Sharp is not installed. Please run: npm install sharp');
  process.exit(1);
}

