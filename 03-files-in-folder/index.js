const path = require('path');
const fs = require('fs');


fs.readdir(path.join(__dirname, 'secret-folder'), (err, item) => {
    for (let i = 0; i < item.length; i++) {
        fs.stat(path.join(__dirname, 'secret-folder', item[i]), (err, stats) => {
            let fileSize = (stats["size"]) + "Bytes";
            if (stats.isFile()) {
                console.log(item[i].replace('.', ' - ') + ' - ' + fileSize);
            }
        })
    }
});