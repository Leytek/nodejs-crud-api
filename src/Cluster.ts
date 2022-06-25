import os from 'os';
import cluster from 'cluster';

export default class Cluster {
  run(): void {
    console.log(`Cluster id:${process.pid} is running`);
    os.cpus().map(cluster.fork);
  }
}
