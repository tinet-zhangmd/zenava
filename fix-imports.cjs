#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to add .js extension to local imports
function fixImports(content) {
  // Match imports from './xxx' or '../xxx' without .js extension
  const importRegex = /(from\s+['"])(\.\.?\/[^'"]+?)(?<!\.js)(['"])/g;
  
  return content.replace(importRegex, (match, prefix, importPath, suffix) => {
    // Don't add .js if it already has an extension
    if (importPath.includes('.')) {
      return match;
    }
    return `${prefix}${importPath}.js${suffix}`;
  });
}

// Get all TypeScript files
const files = glob.sync('src/**/*.{ts,tsx}', { cwd: '/home/user/webapp' });

let fixedCount = 0;
const fixedFiles = [];

files.forEach(file => {
  const filePath = path.join('/home/user/webapp', file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const fixed = fixImports(content);
  
  if (content !== fixed) {
    fs.writeFileSync(filePath, fixed);
    fixedCount++;
    fixedFiles.push(file);
  }
});

console.log(`Fixed ${fixedCount} files:`);
fixedFiles.forEach(file => console.log(`  - ${file}`));