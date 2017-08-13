// server: http.Server
const server = require("http").createServer();
const fs = require("fs");

server.on("request", (req, res) => {
  // memory consuming
  // fs.readFile("./big.file", (err, data) => {
  //   if (err) throw err;

  //   res.end(data);
  // });

  // streaming
  const src = fs.createReadStream("./big.file");
  src.pipe(res);
});

server.listen(8000);
