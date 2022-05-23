// const { name, ext } = path.parse(pathFile); name -имя ext - расширение
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

copy(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));


(async () => {

    await fsPromise.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    const html = await fsPromise.readFile(path.join(__dirname, 'template.html'));
    let htmlText = html.toString();

    const components = await fsPromise.readdir(path.join(__dirname, 'components'));

    for (const component of components) {
        const { name } = path.parse(path.join(__dirname, component));
        const componentText = await fsPromise.readFile(path.join(__dirname, 'components', component));
        if (htmlText.includes(`{{${name}}}`)) {
            htmlText = htmlText.replace(`{{${name}}}`, componentText.toString());
        }
    }
    
    fs.writeFile(
        path.join(__dirname, 'project-dist', 'index.html'),
        htmlText,
        (err) => {
            if (err) throw err;
        }
    );



    const styles = await fsPromise.readdir(path.join(__dirname, 'styles'));
    let stylesText = '';

    for (const style of styles) {
        const styleText = await fsPromise.readFile(path.join(__dirname, 'styles', style));
        stylesText += `${styleText.toString()}\n`;
    }
    
    fs.writeFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        stylesText,
        (err) => {
            if (err) throw err;
        }
    );

})();