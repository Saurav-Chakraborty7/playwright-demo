const fs = require('fs');
const path = require('path');

function saveToJSON(filename, data) {
  const outputDir = path.join(__dirname, '..', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`\n✅ Saved ${data.length} quotes to output/${filename}`);
}

module.exports = { saveToJSON };