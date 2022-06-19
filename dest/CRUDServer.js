var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CRUDServer_instances, _CRUDServer_getPort, _CRUDServer_handleRequest;
import http from 'http';
import UsersEndPoint from './UsersEndPoint';
export default class CRUDServer {
    constructor() {
        _CRUDServer_instances.add(this);
        this.portEnvVar = 'SERVER_PORT';
        this.defaultPort = 8080;
        _CRUDServer_handleRequest.set(this, (req, res) => {
            if (req.url?.startsWith(this.usersEndPoint.url))
                this.usersEndPoint.respond(req, res);
            else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid path, \'/api/users/[id]\' required' }));
            }
        });
        this.port = __classPrivateFieldGet(this, _CRUDServer_instances, "m", _CRUDServer_getPort).call(this, this.portEnvVar);
        this.usersEndPoint = new UsersEndPoint();
        this.server = http.createServer(__classPrivateFieldGet(this, _CRUDServer_handleRequest, "f"));
    }
    run() {
        console.log(`Server id:${process.pid} running on: `, this.port);
        this.server.listen(this.port);
    }
    stop() {
        this.server.close();
    }
}
_CRUDServer_handleRequest = new WeakMap(), _CRUDServer_instances = new WeakSet(), _CRUDServer_getPort = function _CRUDServer_getPort(envVar) {
    return Number(process.env[envVar] ?? this.defaultPort);
};
