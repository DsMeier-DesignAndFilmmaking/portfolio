'use client';

import { useEffect } from 'react';

export default function FaviconGenerator() {
  useEffect(() => {
    // Add roundRect polyfill for older browsers
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(x: number, y: number, width: number, height: number, radius: number) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
      };
    }

    function drawFavicon(canvasId: string, size: number) {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#3B82F6');
      gradient.addColorStop(1, '#8B5CF6');
      
      // Draw rounded rectangle background
      ctx.fillStyle = gradient;
      ctx.beginPath();
      const radius = size * 0.1875; // 6px for 32x32
      ctx.roundRect(0, 0, size, size, radius);
      ctx.fill();
      
      // Draw "D" text
      ctx.fillStyle = 'white';
      ctx.font = `bold ${size * 0.5625}px Arial`; // 18px for 32x32
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D', size / 2, size / 2 + size * 0.0625); // Slight vertical adjustment
    }
    
    // Draw favicons at different sizes
    drawFavicon('canvas16', 16);
    drawFavicon('canvas32', 32);
    drawFavicon('canvas180', 180);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Favicon Generator for Daniel Meier Portfolio</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Instructions to Generate Actual Favicon Files:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Right-click on each canvas below and select "Save image as..."</li>
              <li>Save with the correct filename (e.g., "favicon-16x16.png")</li>
              <li>Replace the placeholder files in your public folder</li>
              <li>For ICO format, use an online converter like <a href="https://favicon.io/favicon-converter/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">favicon.io</a></li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="font-semibold text-gray-700 mb-4">16x16 (Tab Icon)</h4>
              <canvas id="canvas16" width="16" height="16" className="border border-gray-300 rounded mx-auto"></canvas>
              <p className="text-sm text-gray-500 mt-2">Save as: favicon-16x16.png</p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-gray-700 mb-4">32x32 (Standard)</h4>
              <canvas id="canvas32" width="32" height="32" className="border border-gray-300 rounded mx-auto"></canvas>
              <p className="text-sm text-gray-500 mt-2">Save as: favicon-32x32.png</p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-gray-700 mb-4">180x180 (Apple)</h4>
              <canvas id="canvas180" width="180" height="180" className="border border-gray-300 rounded mx-auto"></canvas>
              <p className="text-sm text-gray-500 mt-2">Save as: apple-touch-icon.png</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Design Specifications:</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Background: Blue to purple gradient (#3B82F6 to #8B5CF6)</li>
              <li>• Text: White "D" in Arial Bold</li>
              <li>• Shape: Rounded rectangle with 6px border radius</li>
              <li>• Colors: Blue theme matching your portfolio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
