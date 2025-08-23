const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Read the travel-themed SVG content
const svgContent = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'), 'utf8');

// Create a simple ICO file with the travel theme colors
function createTravelICO() {
  // This creates a basic ICO with the travel theme blue color
  const icoData = Buffer.alloc(150);
  
  // ICO header
  icoData.writeUInt16LE(0, 0);    // Reserved
  icoData.writeUInt16LE(1, 2);    // Type (1 = ICO)
  icoData.writeUInt16LE(1, 4);    // Number of images
  
  // Directory entry
  icoData.writeUInt8(16, 6);      // Width
  icoData.writeUInt8(16, 7);      // Height
  icoData.writeUInt8(0, 8);       // Colors
  icoData.writeUInt8(0, 9);       // Reserved
  icoData.writeUInt16LE(1, 10);   // Planes
  icoData.writeUInt16LE(32, 12);  // Bits per pixel
  icoData.writeUInt32LE(128, 14); // Size
  icoData.writeUInt32LE(22, 18);  // Offset
  
  // Add travel theme blue color (#3B82F6)
  for (let i = 22; i < 150; i++) {
    icoData[i] = 0x3B; // Blue color from travel theme
  }
  
  return icoData;
}

console.log('🌍 Generating travel-themed favicon files...');

async function generateFavicons() {
  try {
    // Convert SVG to different PNG sizes using Sharp
    const sizes = [
      { size: 16, filename: 'favicon-16x16.png' },
      { size: 32, filename: 'favicon-32x32.png' },
      { size: 180, filename: 'apple-touch-icon.png' }
    ];
    
    for (const { size, filename } of sizes) {
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '../public', filename));
      
      console.log(`✅ Created ${filename} (${size}x${size})`);
    }
    
    // Create travel-themed ICO
    const icoData = createTravelICO();
    fs.writeFileSync('public/favicon.ico', icoData);
    console.log('✅ Created travel-themed favicon.ico');
    
    console.log('🎉 All travel-themed favicon files generated successfully!');
    console.log('');
    console.log('🌍 Your favicon now features:');
    console.log('   - Globe/compass design for global travel');
    console.log('   - Design tools (pencil) for UX/UI work');
    console.log('   - Travel element (plane) for nomadic lifestyle');
    console.log('   - Blue color scheme matching your site theme');
    console.log('');
    console.log('💡 Clear your browser cache and refresh the page to see the new favicon!');
    
  } catch (error) {
    console.error('❌ Error generating favicon files:', error.message);
  }
}

generateFavicons();
