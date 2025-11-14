const fs = require('fs');
const path = require('path');

// Create modern DM favicon with teal and terracotta colors
const svgContent = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle with teal gradient -->
  <defs>
    <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E5A74;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16495E;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="terracottaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#C77B30;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B86B27;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle with teal gradient -->
  <circle cx="16" cy="16" r="15" fill="url(#tealGradient)" stroke="url(#terracottaGradient)" stroke-width="2"/>
  
  <!-- DM Monogram in clean, modern style -->
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">DM</text>
</svg>`;

// Write SVG favicon
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent);

// Create HTML generator for PNG versions
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DM Favicon Generator - Modern Teal & Terracotta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .favicon-container {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }
        .favicon-preview {
            text-align: center;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        canvas {
            border: 1px solid #ddd;
            margin: 10px 0;
        }
        .download-btn {
            background: #1E5A74;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        .download-btn:hover {
            background: #16495E;
        }
        .color-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>DM Favicon Generator - Modern Teal & Terracotta</h1>
    <p>Clean, modern favicon with your initials using professional color gradients.</p>
    
    <div class="color-info">
        <h3>Color Palette:</h3>
        <p><strong>Teal Gradient:</strong> #1E5A74 → #16495E (Background)</p>
        <p><strong>Terracotta Gradient:</strong> #C77B30 → #B86B27 (Border)</p>
        <p><strong>Text:</strong> White for maximum contrast</p>
    </div>
    
    <div class="favicon-container">
        <div class="favicon-preview">
            <h3>16x16 Favicon</h3>
            <canvas id="canvas16" width="16" height="16"></canvas>
            <br>
            <button class="download-btn" onclick="downloadCanvas('canvas16', 'favicon-16x16.png')">Download 16x16</button>
        </div>
        
        <div class="favicon-preview">
            <h3>32x32 Favicon</h3>
            <canvas id="canvas32" width="32" height="32"></canvas>
            <br>
            <button class="download-btn" onclick="downloadCanvas('canvas32', 'favicon-32x32.png')">Download 32x32</button>
        </div>
        
        <div class="favicon-preview">
            <h3>512x512 Favicon</h3>
            <canvas id="canvas512" width="512" height="512"></canvas>
            <br>
            <button class="download-btn" onclick="downloadCanvas('canvas512', 'favicon-512x512.png')">Download 512x512</button>
        </div>
    </div>

    <script>
        // Color definitions
        const colors = {
            tealStart: '#1E5A74',
            tealEnd: '#16495E',
            terracottaStart: '#C77B30',
            terracottaEnd: '#B86B27',
            white: '#FFFFFF'
        };

        // Draw favicon at different sizes
        function drawFavicon(canvas, size) {
            const ctx = canvas.getContext('2d');
            const scale = size / 32;
            
            // Create teal gradient
            const tealGradient = ctx.createLinearGradient(0, 0, size, size);
            tealGradient.addColorStop(0, colors.tealStart);
            tealGradient.addColorStop(1, colors.tealEnd);
            
            // Create terracotta gradient
            const terracottaGradient = ctx.createLinearGradient(0, 0, size, size);
            terracottaGradient.addColorStop(0, colors.terracottaStart);
            terracottaGradient.addColorStop(1, colors.terracottaEnd);
            
            // Background circle with teal gradient
            ctx.fillStyle = tealGradient;
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
            ctx.fill();
            
            // Border circle with terracotta gradient
            ctx.strokeStyle = terracottaGradient;
            ctx.lineWidth = 2 * scale;
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
            ctx.stroke();
            
            // DM text in white
            ctx.fillStyle = colors.white;
            ctx.font = \`bold \${12 * scale}px Arial, sans-serif\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('DM', size/2, size/2);
        }

        // Download function
        function downloadCanvas(canvasId, filename) {
            const canvas = document.getElementById(canvasId);
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL();
            link.click();
        }

        // Generate all favicons
        function generateFavicons() {
            drawFavicon(document.getElementById('canvas16'), 16);
            drawFavicon(document.getElementById('canvas32'), 32);
            drawFavicon(document.getElementById('canvas512'), 512);
        }

        // Generate on load
        window.onload = generateFavicons;
    </script>
</body>
</html>`;

// Write HTML generator
fs.writeFileSync(path.join(__dirname, '../public/dm-favicon-generator.html'), htmlContent);

console.log('✅ Generated modern DM favicon with teal and terracotta colors');
console.log('📁 Files created:');
console.log('   - /public/favicon.svg (SVG version)');
console.log('   - /public/dm-favicon-generator.html (PNG generator)');
console.log('🎨 Color scheme:');
console.log('   - Teal gradient: #1E5A74 → #16495E');
console.log('   - Terracotta gradient: #C77B30 → #B86B27');
console.log('   - Text: White for maximum contrast');
console.log('💡 To generate PNG files:');
console.log('   1. Open /public/dm-favicon-generator.html in your browser');
console.log('   2. Click the download buttons for each size');
console.log('   3. Save the files as favicon-16x16.png, favicon-32x32.png, favicon-512x512.png');
