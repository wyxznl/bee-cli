
const fs = require('fs');

function writeToFile() {
  const data = JSON.stringify({
    "presets": ["@babel/preset-env"]
  });

  fs.writeFile('.babelrc', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

writeToFile();