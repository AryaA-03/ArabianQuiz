# IMPORTANT: Background Image Setup

Please save the Arabian Nights background image as:
`/Users/aryaarora/Downloads/arabian-nights-quiz/public/assets/arabian-night.jpg`

The image should be the beautiful purple/pink Arabian night scene with the mosque and palm trees.

Once the image is saved, the animated parallax background will work automatically!

## What I've Implemented:

✅ **Parallax Background Component** (`components/AnimatedBackground.js`)
   - Tracks your cursor movement
   - Moves the background in opposite direction (parallax effect)
   - Smooth 200ms transitions
   - Performance optimized with `willChange`

✅ **Animated Twinkling Stars**
   - 50 randomly positioned stars
   - Each star twinkles at different intervals
   - Creates a magical atmosphere

✅ **Gradient Overlay**
   - Dark overlay for better text readability
   - Doesn't interfere with interactions

✅ **Integrated into App**
   - Added to `_app.js` so it appears on all pages
   - Fixed positioning with z-index management
   - Header and content appear above the background

## How the Parallax Works:

1. Mouse moves → JavaScript tracks cursor position
2. Calculates offset from center of screen
3. Background moves ±15px in opposite direction
4. Creates depth/3D effect as you move your cursor
5. Smooth transitions make it feel natural

## To Save the Image:

You can:
1. Right-click the image in the attachments
2. Save it to: `/Users/aryaarora/Downloads/arabian-nights-quiz/public/assets/arabian-night.jpg`

Or use terminal:
```bash
# If you have the image file somewhere, move it:
cp /path/to/image.jpg /Users/aryaarora/Downloads/arabian-nights-quiz/public/assets/arabian-night.jpg
```

Then refresh your browser and the background will appear with the parallax effect!
