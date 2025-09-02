// Script to find and list all remaining hardcoded Chinese text in HomepageDB.tsx

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/HomepageDB.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Chinese character ranges
const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303f]+/g;

// Split content into lines
const lines = content.split('\n');

const hardcodedTexts = [];

lines.forEach((line, index) => {
  const matches = line.match(chineseRegex);
  if (matches) {
    // Exclude comments and imports
    if (!line.trim().startsWith('//') && !line.trim().startsWith('*') && !line.includes('import')) {
      // Check if it's inside JSX (not in trans. or other variables)
      if (!line.includes('trans.') && !line.includes('language ===')) {
        hardcodedTexts.push({
          lineNumber: index + 1,
          text: line.trim(),
          chinese: matches
        });
      }
    }
  }
});

console.log('Remaining hardcoded Chinese texts in HomepageDB.tsx:\n');
console.log('Total found:', hardcodedTexts.length, '\n');

hardcodedTexts.forEach(item => {
  console.log(`Line ${item.lineNumber}: ${item.chinese.join(', ')}`);
  console.log(`  Full line: ${item.text.substring(0, 100)}...`);
  console.log('');
});

// Group by common patterns
const patterns = {
  features: [],
  titles: [],
  descriptions: [],
  values: [],
  other: []
};

hardcodedTexts.forEach(item => {
  const text = item.text;
  if (text.includes('<span>') || text.includes('class="text-sm')) {
    patterns.features.push(item);
  } else if (text.includes('<h4>') || text.includes('font-bold')) {
    patterns.titles.push(item);
  } else if (text.includes('<p>') && text.includes('text-gray')) {
    patterns.descriptions.push(item);
  } else if (text.includes('font-bold') && (text.includes('%') || text.includes('+') || text.includes('<'))) {
    patterns.values.push(item);
  } else {
    patterns.other.push(item);
  }
});

console.log('\nGrouped by type:');
console.log('Features:', patterns.features.length);
console.log('Titles:', patterns.titles.length);
console.log('Descriptions:', patterns.descriptions.length);
console.log('Values:', patterns.values.length);
console.log('Other:', patterns.other.length);