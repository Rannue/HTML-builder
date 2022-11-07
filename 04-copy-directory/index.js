const fs = require('fs');
const path = require('path');

fs.stat(path.join(__dirname, 'files-copy'), function(err) {
  if (!err) {
      fs.readdir(path.join(__dirname, 'files-copy'), (err, items) => {
        items.forEach(item => {
          fs.unlink(path.join(__dirname, 'files-copy', `${item}`), (err) => {
            if (err) throw err;
          });
        })
      })

      copyFiles() 
  }
  else {
      fs.mkdir(path.join(__dirname, 'files-copy'), err => {
        if (err) throw err; // не удалось создать папку
      })

      copyFiles()    
  }
});

function copyFiles() {
  fs.readdir(path.join(__dirname, 'files'), (err, items) => {
    items.forEach(item => {
      fs.copyFile(path.join(__dirname, 'files', `${item}`), path.join(__dirname, 'files-copy', `${item}`), (err) => {
        if (err) {
            console.error(err)
            return
        }
      });
    })
  })
}


