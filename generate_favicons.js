import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'src/assets/sheetla mata logo.webp';
const publicDir = 'public';

async function generateFavicons() {
  try {
    const img = sharp(inputPath);
    
    // Generate pngs
    await img.resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
    await img.resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    await img.resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // ico can just be a 32x32 png in many cases, but for full compatibility, we'll write it as a raw png
    await img.resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('Favicons generated successfully.');
  } catch (err) {
    console.error('Error generating favicons:', err);
  }
}

generateFavicons();
