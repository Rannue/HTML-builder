const fs = require('fs');
const path = require('path');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundleFile, '', err => {
    if (err) { throw err; }
});

fs.readdir(path.join(__dirname, 'styles'), (err, items) => {
  if (err) { throw err; }
  for (let i = 0; i < items.length; i++) {
      fs.readFile(path.join(__dirname, 'styles', `${items[i]}`), 'UTF-8', function (err, text) {
          if (err) { throw err; }

          if (path.extname(items[i]) === ".css") {
              fs.appendFile(bundleFile, text, err => {
                  if (err) { throw err; }
              });
          }
      });
  }
});