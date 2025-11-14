#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Configuration for mobile screenshots
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/mobile-screenshots');
const MAX_WIDTH = 600; // Max width for retina quality (iPhone screenshots)
const WEBP_QUALITY = 85; // High quality for sharp mobile UI

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}\n`);
}

// Convert filename to web-friendly format
function sanitizeFilename(filename) {
  return filename
    .replace(/Simulator Screenshot - iPhone 17 - /g, 'simulator-')
    .replace(/ at /g, '-')
    .replace(/\./g, '-')
    .replace(/#/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

async function optimizeScreenshot(inputPath, filename) {
  try {
    const baseName = path.basename(filename, path.extname(filename));
    const outputName = sanitizeFilename(baseName);
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.webp`);
    
    // Get original file size
    const inputStats = fs.statSync(inputPath);
    const inputSizeMB = (inputStats.size / (1024 * 1024)).toFixed(2);
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height} (${inputSizeMB} MB)`);
    
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
    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    const compression = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`  ✓ Optimized: ${outputName}.webp (${outputSizeKB} KB, ${compression}% smaller)\n`);
    return { success: true, inputSize: inputStats.size, outputSize: outputStats.size };
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}\n`);
    return { success: false, inputSize: 0, outputSize: 0 };
  }
}

async function main() {
  console.log('🚀 Optimizing all mobile simulator screenshots...\n');
  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Max Width: ${MAX_WIDTH}px (retina quality)`);
  console.log(`Quality: ${WEBP_QUALITY}%\n`);
  console.log('═══════════════════════════════════════\n');

  try {
    // Find all simulator screenshot files
    const files = await readdir(INPUT_DIR);
    const screenshotFiles = files.filter(file => 
      file.startsWith('Simulator Screenshot - iPhone') && 
      /\.(png|jpg|jpeg)$/i.test(file)
    );

    if (screenshotFiles.length === 0) {
      console.log('⚠️  No simulator screenshots found in public/images/');
      console.log('   Looking for files starting with: "Simulator Screenshot - iPhone"\n');
      return;
    }

    console.log(`Found ${screenshotFiles.length} simulator screenshots to optimize\n`);

    let successCount = 0;
    let totalInputSize = 0;
    let totalOutputSize = 0;

    for (const file of screenshotFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      console.log(`Processing: ${file}`);
      
      const result = await optimizeScreenshot(inputPath, file);
      if (result.success) {
        successCount++;
        totalInputSize += result.inputSize;
        totalOutputSize += result.outputSize;
      }
    }

    const totalInputMB = (totalInputSize / (1024 * 1024)).toFixed(2);
    const totalOutputMB = (totalOutputSize / (1024 * 1024)).toFixed(2);
    const totalCompression = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);

    console.log('═══════════════════════════════════════');
    console.log(`✅ Optimization complete!`);
    console.log(`   Processed: ${successCount}/${screenshotFiles.length}`);
    console.log(`   Original size: ${totalInputMB} MB`);
    console.log(`   Optimized size: ${totalOutputMB} MB`);
    console.log(`   Total savings: ${totalCompression}% smaller`);
    console.log(`   Output: ${OUTPUT_DIR}`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
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

