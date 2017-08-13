// server: http.Server
const server = require("http").createServer();

server.on("request", (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("hello world!\n");

  setTimeout(() => {
    res.write("Another message\n");
  }, 1000);

  setTimeout(() => {
    res.write("Yet another message\n");
    res.end();
  }, 5000);
});

server.listen(8000);
