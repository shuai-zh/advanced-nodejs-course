const cluster = require("cluster");
const os = require("os");

// mock db call
const numberOfUsersInDb = () => {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
};

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Master PID: ${process.pid}`);
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker...`);
      cluster.fork();
    }
  });

  // allow to safely(zero downtime) restart workers without kill cluster itself
  // kill -SIGUSR2 masterPID
  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);

    const restartWorker = workerIndex => {
      const worker = workers[workerIndex];
      if (!worker) return;

      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);
        cluster.fork().on("listening", () => {
          restartWorker(workerIndex + 1);
        });
      });

      worker.disconnect();
    };

    restartWorker(0);
  });

  // Object.values(cluster.workers).forEach(worker => {
  //   worker.send(`Hello worker ${worker.id}`);
  // });

  const updateWorkers = () => {
    const userCount = numberOfUsersInDb();
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ userCount });
    });
  };

  updateWorkers();
  setInterval(updateWorkers, 10000);
} else {
  require("./server");
}

// command to benchmark
// ab -c200 -t10 http://localhost:8080/
