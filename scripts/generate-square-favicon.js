#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple canvas-like implementation for Node.js
class SimpleCanvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = new Array(height).fill(null).map(() => new Array(width).fill('transparent'));
  }

  createLinearGradient(x1, y1, x2, y2) {
    return {
      colorStops: [],
      addColorStop: function(position, color) {
        this.colorStops.push({ position, color });
      }
    };
  }

  fillRect(x, y, width, height) {
    const color = this.fillStyle;
    for (let i = Math.floor(y); i < Math.floor(y + height); i++) {
      for (let j = Math.floor(x); j < Math.floor(x + width); j++) {
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          this.data[i][j] = color;
        }
      }
    }
  }

  strokeRect(x, y, width, height) {
    const color = this.strokeStyle;
    const lineWidth = this.lineWidth || 1;
    
    // Top and bottom edges
    for (let i = Math.floor(y); i < Math.floor(y + lineWidth); i++) {
      for (let j = Math.floor(x); j < Math.floor(x + width); j++) {
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          this.data[i][j] = color;
        }
      }
    }
    for (let i = Math.floor(y + height - lineWidth); i < Math.floor(y + height); i++) {
      for (let j = Math.floor(x); j < Math.floor(x + width); j++) {
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          this.data[i][j] = color;
        }
      }
    }
    
    // Left and right edges
    for (let i = Math.floor(y); i < Math.floor(y + height); i++) {
      for (let j = Math.floor(x); j < Math.floor(x + lineWidth); j++) {
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          this.data[i][j] = color;
        }
      }
    }
    for (let i = Math.floor(y); i < Math.floor(y + height); i++) {
      for (let j = Math.floor(x + width - lineWidth); j < Math.floor(x + width); j++) {
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          this.data[i][j] = color;
        }
      }
    }
  }

  // Simple SVG output for now (could be enhanced with PNG generation)
  toSVG() {
    let svg = `<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add background
    svg += `<rect width="${this.width}" height="${this.height}" fill="transparent"/>`;
    
    // Add filled rectangles
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const color = this.data[i][j];
        if (color && color !== 'transparent') {
          svg += `<rect x="${j}" y="${i}" width="1" height="1" fill="${color}"/>`;
        }
      }
    }
    
    svg += '</svg>';
    return svg;
  }
}

// Generate square favicon
function generateSquareFavicon(size) {
  const canvas = new SimpleCanvas(size, size);
  const scale = size / 32;
  
  // Color definitions
  const colors = {
    tealStart: '#1E5A74',
    tealEnd: '#16495E',
    terracottaStart: '#C77B30',
    terracottaEnd: '#B86B27',
    white: '#FFFFFF'
  };
  
  // Background square with teal gradient (using start color for simplicity)
  canvas.fillStyle = colors.tealStart;
  canvas.fillRect(2 * scale, 2 * scale, size - 4 * scale, size - 4 * scale);
  
  // Border square with terracotta gradient
  canvas.strokeStyle = colors.terracottaStart;
  canvas.lineWidth = 2 * scale;
  canvas.strokeRect(2 * scale, 2 * scale, size - 4 * scale, size - 4 * scale);
  
  // For SVG, we'll add the DM text as an SVG element
  const svg = canvas.toSVG();
  
  // Add DM text to SVG
  const textSize = 14 * scale;
  const finalSVG = svg.replace('</svg>', 
    `<text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="middle" 
     font-family="Arial, sans-serif" font-size="${textSize}" font-weight="bold" fill="${colors.white}">DM</text></svg>`);
  
  return finalSVG;
}

// Generate favicons for different sizes
const sizes = [16, 32, 512];
const outputDir = path.join(__dirname, '..', 'public');

console.log('Generating square favicon files...');

sizes.forEach(size => {
  const svg = generateSquareFavicon(size);
  const filename = `favicon-${size}x${size}.svg`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`Generated ${filename}`);
});

// Also generate the main favicon.svg
const mainFavicon = generateSquareFavicon(32);
fs.writeFileSync(path.join(outputDir, 'favicon.svg'), mainFavicon);
console.log('Generated favicon.svg');

console.log('\n✅ Square favicon generation complete!');
console.log('Note: These are SVG files. For PNG/ICO files, use the updated HTML generator tool.');
