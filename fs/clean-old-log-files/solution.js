const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "./logs");

const ms1Day = 24 * 60 * 60 * 1000;

const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    if (Date.now() - stats.mtime.getTime() > 7 * ms1Day) {
      fs.unlink(filePath, err => {
        if (err) throw err;
        console.log(`deleted ${filePath}`);
      });
    }
  });
});
