const fs = require('fs');
const path = require('path');

let fileText = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf8');
fileText.on('readable', function () {
  let data = fileText.read();
  if (data) {
      console.log(data);
  }
})