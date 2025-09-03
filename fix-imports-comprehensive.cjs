#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to add .js extension to all local imports
function fixImports(content) {
  // Match imports from './xxx' or '../xxx' without .js extension
  const importRegex1 = /(from\s+['"])(\.\.?\/[^'"]+?)(?<!\.js)(['"])/g;
  // Match dynamic imports
  const importRegex2 = /(import\s*\(\s*['"])(\.\.?\/[^'"]+?)(?<!\.js)(['"]\s*\))/g;
  // Match require statements
  const requireRegex = /(require\s*\(\s*['"])(\.\.?\/[^'"]+?)(?<!\.js)(['"]\s*\))/g;
  
  let fixed = content.replace(importRegex1, (match, prefix, importPath, suffix) => {
    // Don't add .js if it already has an extension
    if (importPath.match(/\.\w+$/)) {
      return match;
    }
    return `${prefix}${importPath}.js${suffix}`;
  });
  
  fixed = fixed.replace(importRegex2, (match, prefix, importPath, suffix) => {
    if (importPath.match(/\.\w+$/)) {
      return match;
    }
    return `${prefix}${importPath}.js${suffix}`;
  });
  
  fixed = fixed.replace(requireRegex, (match, prefix, importPath, suffix) => {
    if (importPath.match(/\.\w+$/)) {
      return match;
    }
    return `${prefix}${importPath}.js${suffix}`;
  });
  
  return fixed;
}

// Get all TypeScript and JavaScript files
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', { cwd: '/home/user/webapp' });

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
    
    // Show what was changed
    const lines = content.split('\n');
    const fixedLines = fixed.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] !== fixedLines[i]) {
        console.log(`${file}:${i+1}`);
        console.log(`  - ${lines[i]}`);
        console.log(`  + ${fixedLines[i]}`);
      }
    }
  }
});

console.log(`\nFixed ${fixedCount} files total.`);
if (fixedCount === 0) {
  console.log('All imports already have proper extensions.')
}