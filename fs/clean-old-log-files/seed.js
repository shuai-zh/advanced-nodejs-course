const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "./logs");

fs.mkdirSync(dir);
const ms1Day = 24 * 60 * 60 * 1000;
const time = (Date.now() - i * ms1Day) / 1000;

for (let i = 0; i < 10; i++) {
  const filePath = path.join(dir, `file${i}`);
  fs.writeFile(filePath, i, err => {
    if (err) throw err;

    fs.utimes(filePath, time, time, err => {
      if (err) throw err;
    });
  });
}
