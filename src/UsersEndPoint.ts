import http from 'http';
import path from 'path';
import * as uuid from 'uuid';
import Users, {TUser} from './Users';

export default class UsersEndPoint {
  public url = '/api/users';
  private users: Users;

  constructor() {
    this.users = new Users();
  }

  async respond(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const reqPath = req.url ?? this.url;

    const rawBody = await new Promise<string>((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => resolve(body))
    });

    try {
      const body = rawBody ? JSON.parse(rawBody) : {};
      const resource = path.basename(reqPath);

      if (resource === 'users') {
        if (req.method === 'GET') {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({users: this.users.allUsers}));
        } else if (req.method === 'POST') {
          if ('username' in body && 'age' in body && 'hobbies' in body) {
            const user = {} as TUser;
            user.id = uuid.v4();
            delete body.id;
            Object.assign(user, body);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(this.users.createUser(user)));
          } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Invalid fields in received user.'}));
          }
        } else {
          res.writeHead(404, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({message: 'Invalid request method in this resource.'}));
        }
      } else {
        if (uuid.validate(resource)) {
          const user = this.users.getUser(resource);
          if (user) {
            if (req.method === 'GET') {
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify(user));
            } else if (req.method === 'PUT') {
              if ('username' in body || 'age' in body || 'hobbies' in body) {
                body.id = resource;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(this.users.updateUser(body)));
              }
            } else if (req.method === 'DELETE') {
              res.writeHead(204, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({users: this.users.deleteUser(resource)}));
            } else {
              res.writeHead(404, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({message: 'Invalid request method in this resource.'}));
            }
          } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Invalid id, user doesn\'t exist.'}));
          }
        } else {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({message: 'Invalid id format.'}));
        }
      }
    } catch (_) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Server error.'}));
    }
  }
}
