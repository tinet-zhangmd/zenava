const fs = require('fs');
const path = require('path');

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern to match relative imports without extensions
  const importPattern = /^(import\s+(?:{[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+['"])(\.\/[^'"]+)(['"])/gm;
  
  content = content.replace(importPattern, (match, prefix, importPath, suffix) => {
    // Skip if already has extension
    if (importPath.match(/\.(ts|tsx|js|jsx|json|css)$/)) {
      return match;
    }
    
    // Skip if it's an API import
    if (importPath.includes('/api/')) {
      return match;
    }
    
    modified = true;
    // For TypeScript/React files, add .js extension (will be transpiled)
    return `${prefix}${importPath}.js${suffix}`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

// Process all TypeScript files
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(fullPath);
    } else if (file.match(/\.(ts|tsx)$/)) {
      fixImportsInFile(fullPath);
    }
  });
}

// Start processing
console.log('Fixing import statements...');
processDirectory('./src');
console.log('Import fixes complete!');