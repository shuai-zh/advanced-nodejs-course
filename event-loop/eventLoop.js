setTimeout(() => {
  setTimeout(() => console.log("Timeout"));
  setImmediate(() => console.log("Immediate"));
  process.nextTick(console.log, "NextTick");
});
