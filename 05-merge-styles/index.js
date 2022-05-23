const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => {
        if (err)
            console.log(err);
        else {
            let outStyle = '';
            files.forEach((file) => {
                if (file.isFile() && path.extname(file.name) === '.css') {
                    fs.readFile(
                        path.join(__dirname, 'styles', file.name),
                        'utf-8',
                        (err, data) => {
                            if (err) throw err;
                            outStyle += data;
                            fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), outStyle, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                        }
                    );
                }
            });


        }

    });

