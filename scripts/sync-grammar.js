const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../../vscode/syntaxes/rune.tmLanguage.json');
const destDir = path.resolve(__dirname, '../src/lib/rune-grammar');
const destPath = path.resolve(destDir, 'rune.tmLanguage.json');

try {
  console.log('Synchronizing Rune TextMate Grammar...');
  console.log(`Source: ${srcPath}`);
  console.log(`Destination: ${destPath}`);

  if (!fs.existsSync(srcPath)) {
    console.error(`Error: Source grammar file not found at ${srcPath}`);
    process.exit(1);
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }

  // Copy file
  fs.copyFileSync(srcPath, destPath);
  console.log('Grammar synchronized successfully!');
} catch (error) {
  console.error('Failed to synchronize grammar:', error);
  process.exit(1);
}
