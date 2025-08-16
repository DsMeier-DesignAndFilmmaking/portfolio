const fs = require('fs');

// Create a simple ICO file with a blue "D" design
function createICO() {
  // This is a minimal 16x16 ICO file with a blue background
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
  
  // Add blue color data
  for (let i = 22; i < 150; i++) {
    icoData[i] = 0x3B; // Blue color
  }
  
  return icoData;
}

console.log('Creating favicon.ico...');
const icoData = createICO();
fs.writeFileSync('public/favicon.ico', icoData);
console.log('✅ Created favicon.ico');
console.log('💡 Now use the favicon generator to create PNG files');
