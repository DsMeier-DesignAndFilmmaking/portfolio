const fs = require('fs');

// Create a simple base64-encoded PNG for testing
function createSimplePNG(size) {
  // This is a minimal 1x1 blue PNG in base64
  const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  return Buffer.from(base64PNG, 'base64');
}

// Create a simple ICO file
function createSimpleICO() {
  // Minimal ICO file structure
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
  
  // Add some basic pixel data
  for (let i = 22; i < 150; i++) {
    icoData[i] = 0x3B; // Blue color
  }
  
  return icoData;
}

console.log('Generating favicon files...');

try {
  // Create favicon.ico
  const icoData = createSimpleICO();
  fs.writeFileSync('public/favicon.ico', icoData);
  console.log('✅ Created favicon.ico');
  
  // Create 16x16 PNG
  const png16 = createSimplePNG(16);
  fs.writeFileSync('public/favicon-16x16.png', png16);
  console.log('✅ Created favicon-16x16.png');
  
  // Create 32x32 PNG
  const png32 = createSimplePNG(32);
  fs.writeFileSync('public/favicon-32x32.png', png32);
  console.log('✅ Created favicon-32x32.png');
  
  // Create 180x180 PNG
  const png180 = createSimplePNG(180);
  fs.writeFileSync('public/apple-touch-icon.png', png180);
  console.log('✅ Created apple-touch-icon.png');
  
  console.log('🎉 All favicon files generated successfully!');
  console.log('💡 Now clear your browser cache and refresh the page.');
  
} catch (error) {
  console.error('❌ Error generating favicon files:', error.message);
}
