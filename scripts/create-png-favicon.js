const fs = require('fs');
const path = require('path');

// Create a simple PNG favicon using a canvas-like approach
// Since we can't use Canvas directly in Node.js without additional packages,
// I'll create a simple HTML file that can generate the PNG

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>PNG Favicon Generator</title>
</head>
<body>
    <canvas id="faviconCanvas" width="32" height="32" style="border: 1px solid #ccc;"></canvas>
    <br>
    <button onclick="downloadFavicon()">Download PNG Favicon</button>
    
    <script>
        const canvas = document.getElementById('faviconCanvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, 32, 32);
        
        // Background circle
        ctx.fillStyle = '#3B82F6';
        ctx.strokeStyle = '#1E40AF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(16, 16, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Globe grid lines
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.8;
        
        // Vertical line
        ctx.beginPath();
        ctx.moveTo(16, 1);
        ctx.lineTo(16, 31);
        ctx.stroke();
        
        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(1, 16);
        ctx.lineTo(31, 16);
        ctx.stroke();
        
        // Ellipses
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 0.5;
        
        // Outer ellipse
        ctx.beginPath();
        ctx.ellipse(16, 16, 12, 4, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Inner ellipse
        ctx.beginPath();
        ctx.ellipse(16, 16, 8, 6, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Compass arrows
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFFFFF';
        
        // North arrow
        ctx.beginPath();
        ctx.moveTo(16, 8);
        ctx.lineTo(18, 14);
        ctx.lineTo(16, 12);
        ctx.lineTo(14, 14);
        ctx.closePath();
        ctx.fill();
        
        // South arrow
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(16, 24);
        ctx.lineTo(14, 18);
        ctx.lineTo(16, 20);
        ctx.lineTo(18, 18);
        ctx.closePath();
        ctx.fill();
        
        // Design element - pencil
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#F59E0B';
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.moveTo(22, 10);
        ctx.lineTo(26, 6);
        ctx.lineTo(26, 8);
        ctx.lineTo(22, 12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Pencil tip
        ctx.beginPath();
        ctx.moveTo(22, 12);
        ctx.lineTo(24, 14);
        ctx.lineTo(22, 16);
        ctx.lineTo(20, 14);
        ctx.closePath();
        ctx.fill();
        
        // Travel element - plane
        ctx.fillStyle = '#10B981';
        ctx.strokeStyle = '#059669';
        
        // Plane body
        ctx.beginPath();
        ctx.moveTo(6, 22);
        ctx.lineTo(10, 20);
        ctx.lineTo(12, 22);
        ctx.lineTo(10, 24);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Plane tail
        ctx.beginPath();
        ctx.moveTo(8, 20);
        ctx.lineTo(8, 24);
        ctx.lineTo(6, 22);
        ctx.closePath();
        ctx.fill();
        
        function downloadFavicon() {
            const link = document.createElement('a');
            link.download = 'favicon.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../public/favicon-png-generator.html'), htmlContent);

console.log('✅ PNG favicon generator created at public/favicon-png-generator.html');
console.log('📝 Instructions:');
console.log('   1. Open public/favicon-png-generator.html in your browser');
console.log('   2. Click "Download PNG Favicon" button');
console.log('   3. Save the file as favicon.png in the public folder');
console.log('   4. The PNG will be optimized for favicon use');
