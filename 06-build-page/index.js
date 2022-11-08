let path = require('path');
const fs = require('fs');

const project_dist = path.join(__dirname, 'project-dist');
const project_dist_html = path.join(__dirname, 'project-dist', 'index.html');

fs.mkdir(project_dist, { recursive: true }, err => {
    if (err) throw err; // не удалось создать папку

    addFile_HTML()
    addFile_CSS()
    addAssets()
});


function addFile_HTML() {
  fs.readFile(path.join(__dirname, 'template.html'), "utf-8", function (err, text) {
      if (err) { throw err; }
      fs.writeFile(project_dist_html, text, err => {
          if (err) throw err;
          fs.readFile(project_dist_html, 'utf-8', (err, htmlText) => {
              if (err) throw err;
              let match = /\{\{(\w+)\}\}/g;
              let tegsArray = htmlText.match(match);

              tegsArray.forEach(teg => {
                  let tegName = teg.slice(2, -2);
                  fs.readFile(path.join(__dirname, 'components', `${tegName}.html`), "utf-8", (err, tegText) => {
                      if (!err) {
                          let newHTMLText = htmlText.replace(teg, tegText);

                          htmlText = newHTMLText;
                          fs.writeFile(project_dist_html, htmlText, err => {
                              if (err) throw err;
                          })
                      }
                  });
              });
          });
      });
  });
}

function addFile_CSS() {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', err => {
    if (err) { throw err; }
});

fs.readdir(path.join(__dirname, 'styles'), (err, items) => {
  if (err) { throw err; }
  for (let i = 0; i < items.length; i++) {
      fs.readFile(path.join(__dirname, 'styles', `${items[i]}`), 'UTF-8', function (err, text) {
          if (err) { throw err; }

          if (path.extname(items[i]) === ".css") {
              fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), text, err => {
                  if (err) { throw err; }
              });
          }
      });
  }
});
}

function addAssets() {
  fs.stat(path.join(__dirname, 'project-dist', 'assets'), function(err) {
    if (!err) {
        fs.readdir(path.join(__dirname, 'project-dist', 'assets'), (err, items) => {

          items.forEach(item => {
            fs.readdir(path.join(__dirname, 'project-dist', 'assets', `${item}`), (err, itemFiles) => {

              itemFiles.forEach(file => {
                fs.unlink(path.join(__dirname, 'project-dist',  'assets', `${item}`, `${file}`), (err) => {
                  if (err) throw err;
                });
          })
        })
  
        copyFiles() 
          })   
        })
    }
    else {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
          if (err) throw err; // не удалось создать папку
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), err => {
            if (err) throw err; // не удалось создать папку fonts
          })
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), err => {
            if (err) throw err; // не удалось создать папку img
          })
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), err => {
            if (err) throw err; // не удалось создать папку svg
          })
        })
  
        copyFiles()    
    }
  });
  
  function copyFiles() {
    fs.readdir(path.join(__dirname, 'assets'), (err, items) => {
      items.forEach(item => {
        
        fs.readdir(path.join(__dirname, 'assets', `${item}`), (err, itemFiles) => {
          itemFiles.forEach(file => {
            fs.copyFile(path.join(__dirname, 'assets', `${item}`, `${file}`), path.join(__dirname, 'project-dist', 'assets', `${item}`, `${file}`), (err) => {
              if (err) {
                  console.error(err)
              }
            });
          })
        })
      })
    })
  }
}
