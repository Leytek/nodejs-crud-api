import 'dotenv/config';
import Server from './Server';
const server = new Server();
server.run();
console.log(process.env);
