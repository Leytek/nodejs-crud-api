import 'dotenv/config';
import cluster from 'cluster';
import Cluster from './Cluster';
import CRUDServer from './CRUDServer';

let server: CRUDServer;

if (cluster.isPrimary && process.argv.includes('--multi'))
  new Cluster().run();
else
  (server = new CRUDServer()).run();

export { server }
