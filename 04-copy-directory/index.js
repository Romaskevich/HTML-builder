const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const copy = async (pathDir, pathDirCopy) => {

    await fsPromise.mkdir(pathDirCopy, { recursive: true });

    fs.readdir(pathDir, { withFileTypes: true }, (err, data) => {
        if (err) throw err;
        data.forEach(file => {
            if (file.isFile()) {
                fs.copyFile(path.join(pathDir, file.name), path.join(pathDirCopy, file.name), (err) => {
                    if (err) throw err;
                });
            }
            else if (file.isDirectory()) {
                copy(path.join(pathDir, file.name), path.join(pathDirCopy, file.name));
            }
        });
    });

    fs.readdir(pathDirCopy, (err, data) => {
        if (err) throw err;
        data.forEach(file => {
            fs.access(path.join(pathDir, file), (err) => {
                if (err) {
                    fs.rm(path.join(pathDirCopy, file), (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
    });

};

copy(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));