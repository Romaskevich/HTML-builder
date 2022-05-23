const fs = require('fs');
const path = require('path');

let arr = [];

fs.readdir(path.join(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (err, files) => {
        console.log("Информация о файлах в secret-folder:");
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (file.isFile()) {
                    //   console.log(file.name.split('.')[0]);
                    //   console.log(path.extname(file.name).slice(1));
                    //   console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)}`);
                    arr.push(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)}`);
                }
            })
        }
        arr.forEach(item => {
            // console.log(item.split(' ')[0] + '.' + item.substring(item.indexOf('- ') + 2));
            let fileName = item.split(' ')[0] + '.' + item.substring(item.indexOf('- ') + 2);
            let filePath = path.join(__dirname, 'secret-folder', fileName);
            // console.log(filePath);
            fs.stat(filePath, (err, stats) => {
                // console.log(stats.size);
                item += ` - ${(stats.size / 1024).toFixed(3)}kb`;
                console.log(item);
            });
        });
    });