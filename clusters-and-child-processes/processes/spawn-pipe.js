const { spawn } = require("child_process");

const child = spawn("wc");

process.stdin.pipe(child.stdin);

child.stdout.on("data", data => {
  console.log(`child process stdout:\n${data}`);
});

// press Ctrl+D to get result after typing any text