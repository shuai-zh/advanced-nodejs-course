const http = require("http");
const { fork } = require("child_process");

// const longComputation = () => {
//   let sum = 0;
//   for (let i = 0; i < 1e9; i++) {
//     sum += i;
//   }
//   return sum;
// };

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/compute") {
    // this will make the server not able to respond to any requests before finishing the longComputationF
    // const sum = longComputation();
    // return res.end(`Sum is ${sum}`);

    // using fork will not block any other requests
    const compute = fork("./compute.js");
    compute.on("message", sum => {
      res.end(`Sum is ${sum}`);
    });
    compute.send("start");
  } else {
    res.end("Ok");
  }
});

server.listen(3000);
