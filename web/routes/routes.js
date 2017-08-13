const fs = require("fs");
const path = require("path");

// server: http.Server
const server = require("http").createServer();
const data = { a: 1, b: 2 };

server.on("request", (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
  switch (req.url) {
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
      break;
    case "/home":
    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      const template = path.join(__dirname, `.${req.url}.html`);
      res.end(fs.readFileSync(template));
      break;
    case "/":
      res.writeHead(301, { Location: "/home" });
      res.end();
      break;
    default:
      res.writeHead(404);
      res.end();
  }
});

server.listen(8000);
