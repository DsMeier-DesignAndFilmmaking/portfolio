# Mobile Screenshots Optimization

This directory contains optimized mobile simulator screenshots for the AI Sandbox project page.

## Required Images

The following simulator screenshots need to be added to `/public/images/` folder:

1. `Simulator Screenshot - iPhone 17 - 2025-10-05 at 09.44.52.png`
2. `Simulator Screenshot - iPhone 17 - 2025-09-28 at 17.08.56.png`
3. `Simulator Screenshot - iPhone 17 - 2025-09-29 at 16.53.12.png`
4. `Simulator Screenshot - iPhone 17 - 2025-10-04 at 13.04.38.png`
5. `Simulator Screenshot - iPhone 17 - 2025-10-07 at 22.01.21.png`

## How to Add and Optimize Images

### Step 1: Export Screenshots from Xcode
1. Run your iOS simulator in Xcode
2. Press `Cmd + S` to save screenshots
3. Screenshots will be saved to your Desktop with the naming format shown above

### Step 2: Move to Project
```bash
# Move the simulator screenshots to the public/images folder
mv ~/Desktop/"Simulator Screenshot - iPhone 17 - 2025-*.png" public/images/
```

### Step 3: Optimize Images
```bash
# Run the optimization script
node scripts/optimize-mobile-screenshots.js
```

This will:
- Resize images to max 600px width (retina quality)
- Convert to optimized WebP format (85% quality)
- Save to `public/images/mobile-screenshots/`
- Maintain proper aspect ratio for iPhone displays

## Output Format

Optimized images will be named:
- `simulator-2025-10-05-09-44-52.webp`
- `simulator-2025-09-28-17-08-56.webp`
- `simulator-2025-09-29-16-53-12.webp`
- `simulator-2025-10-04-13-04-38.webp`
- `simulator-2025-10-07-22-01-21.webp`

## Image Specifications

- **Max Width:** 600px (retina quality for mobile displays)
- **Format:** WebP
- **Quality:** 85%
- **Aspect Ratio:** 9:19.5 (iPhone standard)
- **Loading:** Lazy loaded with async decoding
- **Performance:** Optimized for web with proper compression

## Layout

The images are displayed in a responsive grid:
- **Mobile:** 1 column
- **Tablet:** 2 columns
- **Desktop:** 3 columns

Each image has:
- Rounded corners (border-radius: 1rem)
- Shadow effect with hover enhancement
- Smooth fade-in animation
- Proper spacing (gap: 1.5rem)

