const EventEmitter = require("events");

class Logger extends EventEmitter {}

const logger = new Logger();


logger.on("event", () => {
  console.log("EVENT");
});


logger.emit("event");
