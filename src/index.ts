import 'dotenv/config';
import cluster from 'cluster';
import Cluster from './Cluster';
import CRUDServer from './CRUDServer';

if (cluster.isPrimary)
  new Cluster().run();
else
  new CRUDServer().run();
