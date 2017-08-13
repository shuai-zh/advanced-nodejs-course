// const { Writable } = require("stream");
// const opts = {
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   }
// };

// const outStream = new Writable(opts);

// process.stdin.pipe(outStream);
process.stdin.pipe(process.stdout);
