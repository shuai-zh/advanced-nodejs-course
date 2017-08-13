process.on("exit", code => {
  console.log(code);
});

process.on("uncaughtException", err=>{
  // somthing went unhandled
  // Do any cleanup and exit anyway

  // don't do this
  // console.error(err);

  process.exit(1);
})

process.stdin.resume();
console.dog();