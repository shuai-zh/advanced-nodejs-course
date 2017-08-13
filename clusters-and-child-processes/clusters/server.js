// server: http.Server
const http = require("http");
const pid = process.pid;

let userCount;

http
  .createServer((req, res) => {
    // simulate CPU work
    for (let i = 0; i < 1e7; i++);
    res.write(`Handled by process ${pid}\n`);
    res.end(`Users: ${userCount}`);
  })
  .listen(8080, () => console.log(`Started process ${pid}`));

process.on("message", msg => {
  userCount = msg.userCount;
});

// kill itself at a random time point
// setTimeout(() => {
//   process.exit(1);
// }, Math.random() * 10000);
