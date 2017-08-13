const fs = require("fs");

// supports both promise and callback
const readFileAsArray = (file, cb = () => {}) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(err);
      }

      const lines = data.toString().trim().split("\n");
      resolve(lines);
      cb(null, lines);
    });
  });

// use promise
readFileAsArray("./numbers")
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log("odd number count: ", oddNumbers.length);
  })
  .catch(console.err);

// use callback
readFileAsArray("./numbers", (err, data) => {
  if (err) throw err;

  const numbers = data.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);
  console.log("odd number count: ", oddNumbers.length);
});

// use async/await
async function countOdd() {
  try {
    const lines = await readFileAsArray("./numbers");
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log("odd number count: ", oddNumbers.length);
  } catch (err) {
    console.error(err);
  }
}

countOdd()
