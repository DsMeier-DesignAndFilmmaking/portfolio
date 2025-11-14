const fs = require('fs');
const path = require('path');

// Create SVG favicon
const svgContent = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle with travel-inspired ocean blue -->
  <circle cx="16" cy="16" r="15" fill="#1E5A74" stroke="#C77B30" stroke-width="2"/>
  
  <!-- DM Monogram in sand beige -->
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#EBD6B6">DM</text>
</svg>`;

// Write SVG favicon
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent);

console.log('✅ Generated favicon.svg');
console.log('📁 Location: /public/favicon.svg');
console.log('🎨 Design: Minimal monogram with travel colors');
console.log('🔧 Colors: Ocean blue (#1E5A74) background, sand beige (#EBD6B6) text, terracotta (#C77B30) border');