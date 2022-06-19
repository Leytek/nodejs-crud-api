import http from 'http';
import UsersEndPoint from './UsersEndPoint';

export default class CRUDServer {
  private portEnvVar = 'SERVER_PORT';
  private defaultPort = 8080;
  private readonly port: number;
  private server;
  private usersEndPoint;

  constructor() {
    this.port = this.#getPort(this.portEnvVar);
    this.usersEndPoint = new UsersEndPoint();
    this.server = http.createServer(this.#handleRequest);

  }

  run(): void {
    console.log('Server running on: ', this.port);
    this.server.listen(this.port);
  }

  #getPort(envVar: string): number {
    return Number(process.env[envVar] ?? this.defaultPort);
  }

  #handleRequest = (req: http.IncomingMessage, res: http.ServerResponse): void => {
    if (req.url === this.usersEndPoint.url)
      this.usersEndPoint.respond(req, res);
  }
}