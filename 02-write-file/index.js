const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crtInrerface = readline.createInterface({ input: process.stdin, output: process.stdout });

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
      if (err) throw err;
  }
);

console.log('__Пожалуйста, введите любой текст')

crtInrerface.on("line", (data) => {
  if (data == "exit") {
      console.log('\n__Спасибо за ваш текст. Он очень важен для нас');
      process.exit();
  }

  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    `${data}\n`,
    err => {
        if (err) throw err;
        console.log('__Добавлено!');
    }
  );
  
}).on("close", () => {
  console.log('\n__Спасибо за ваш текст. Он очень важен для нас');
  process.exit();
});

