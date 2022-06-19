import http from "http";

export default class UsersEndPoint {
  public url = '/api/users';

  respond(req: http.IncomingMessage, res: http.ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World! its' + this.url
    }));
  }
}
