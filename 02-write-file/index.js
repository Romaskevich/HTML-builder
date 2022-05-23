const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

fs.writeFile(
    path.join(__dirname, 'mynotes.txt'), '', (err) => { if (err) throw err });

rl.question('Файл создан. Введите текст и нажмите Enter\n', (input) => {
    if (input == 'exit') {
        rl.close();
    } else {
        fs.appendFile(
            path.join(__dirname, 'mynotes.txt'),
            `${input}\n`,
            err => {
                if (err) throw err;
                console.log('Введенный текст записан в файл.');
                console.log('Введите ещё текст или exit для выхода');
            }
        );
    }
});

rl.on('line', (input) => {
    if (input == 'exit') {
        rl.close();
    } else {
        fs.appendFile(
            path.join(__dirname, 'mynotes.txt'),
            `${input}\n`,
            err => {
                if (err) throw err;
                console.log('Введенный текст записан в файл.');
                console.log('Введите ещё текст или exit для выхода');
            }
        );
    }
});

rl.on('close', () => {
    console.log('До новых запусков :)');
  });
