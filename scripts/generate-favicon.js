const fs = require('fs');
const path = require('path');

// Read the SVG content
const svgContent = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'), 'utf8');

// Create a simple HTML file to convert SVG to different sizes
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Favicon Generator</title>
    <style>
        body { margin: 0; padding: 20px; background: #f0f0f0; }
        .favicon-container { display: flex; gap: 20px; flex-wrap: wrap; }
        .favicon-item { 
            background: white; 
            padding: 10px; 
            border-radius: 8px; 
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .favicon-item img { 
            border: 1px solid #ddd; 
            border-radius: 4px;
        }
        .size-label { 
            font-family: monospace; 
            font-size: 12px; 
            color: #666; 
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <h1>Favicon Preview - Design & Travel Theme</h1>
    <p>This shows how your favicon will look at different sizes in browser tabs and bookmarks.</p>
    
    <div class="favicon-container">
        <div class="favicon-item">
            <img src="data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}" width="16" height="16" alt="16x16">
            <div class="size-label">16x16 (Browser Tab)</div>
        </div>
        <div class="favicon-item">
            <img src="data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}" width="32" height="32" alt="32x32">
            <div class="size-label">32x32 (High DPI)</div>
        </div>
        <div class="favicon-item">
            <img src="data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}" width="48" height="48" alt="48x48">
            <div class="size-label">48x48 (Bookmarks)</div>
        </div>
        <div class="favicon-item">
            <img src="data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}" width="64" height="64" alt="64x64">
            <div class="size-label">64x64 (Large Display)</div>
        </div>
    </div>
    
    <h2>Design Elements:</h2>
    <ul>
        <li><strong>Globe/Compass:</strong> Represents your global travel perspective (41 countries)</li>
        <li><strong>Design Tools:</strong> Pencil/brush element for your UX/UI design work</li>
        <li><strong>Travel Element:</strong> Plane symbol for your nomadic lifestyle</li>
        <li><strong>Color Scheme:</strong> Blue (#3B82F6) matches your site's theme</li>
    </ul>
    
    <h2>Best Practices Applied:</h2>
    <ul>
        <li><strong>Simple Shapes:</strong> Clean, recognizable elements that scale well</li>
        <li><strong>High Contrast:</strong> White elements on blue background for readability</li>
        <li><strong>Scalable:</strong> SVG format ensures crisp display at all sizes</li>
        <li><strong>Meaningful:</strong> Reflects your identity as a designer and traveler</li>
    </ul>
</body>
</html>
`;

// Write the preview HTML file
fs.writeFileSync(path.join(__dirname, '../public/favicon-preview.html'), htmlContent);

console.log('✅ Favicon preview generated at public/favicon-preview.html');
console.log('🌍 New favicon features:');
console.log('   - Globe/compass design representing global travel');
console.log('   - Design tools (pencil/brush) for UX/UI work');
console.log('   - Travel element (plane) for nomadic lifestyle');
console.log('   - Blue color scheme matching your site theme');
console.log('   - Scalable SVG format for crisp display');
