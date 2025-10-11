#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../public/images/mobile-screenshots');

// iPhone aspect ratio (9:19.5)
const WIDTH = 600;
const HEIGHT = Math.round(WIDTH * (19.5 / 9)); // ~1300px

const PLACEHOLDERS = [
  { name: 'simulator-2025-10-05-09-44-52', label: 'Oct 5, 2025' },
  { name: 'simulator-2025-09-28-17-08-56', label: 'Sep 28, 2025' },
  { name: 'simulator-2025-09-29-16-53-12', label: 'Sep 29, 2025' },
  { name: 'simulator-2025-10-04-13-04-38', label: 'Oct 4, 2025' },
  { name: 'simulator-2025-10-07-22-01-21', label: 'Oct 7, 2025' }
];

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function createPlaceholder(name, label, index) {
  try {
    // Create gradient background
    const svg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(15,23,42);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(30,41,59);stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grad${index})" />
        <text 
          x="50%" 
          y="45%" 
          font-family="Arial, sans-serif" 
          font-size="32" 
          font-weight="600"
          fill="#94a3b8" 
          text-anchor="middle"
        >Mobile Screenshot</text>
        <text 
          x="50%" 
          y="55%" 
          font-family="Arial, sans-serif" 
          font-size="24" 
          fill="#64748b" 
          text-anchor="middle"
        >${label}</text>
        <text 
          x="50%" 
          y="65%" 
          font-family="Arial, sans-serif" 
          font-size="18" 
          fill="#475569" 
          text-anchor="middle"
        >Placeholder - Add actual screenshot</text>
      </svg>
    `;

    const outputPath = path.join(OUTPUT_DIR, `${name}.webp`);
    
    await sharp(Buffer.from(svg))
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`✓ Created: ${name}.webp`);
  } catch (error) {
    console.error(`✗ Error creating ${name}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Creating placeholder screenshots...\n');
  console.log(`Size: ${WIDTH}x${HEIGHT}px (iPhone aspect ratio)\n`);

  for (let i = 0; i < PLACEHOLDERS.length; i++) {
    const placeholder = PLACEHOLDERS[i];
    await createPlaceholder(placeholder.name, placeholder.label, i);
  }

  console.log('\n✅ Placeholders created!');
  console.log('📁 Location:', OUTPUT_DIR);
  console.log('\n⚠️  Remember to replace these with actual simulator screenshots.');
  console.log('   Run: node scripts/optimize-mobile-screenshots.js\n');
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

