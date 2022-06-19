import http from 'http';
import * as uuid from 'uuid'
import { server } from '../dest/index';

const request = async (data, path, method) => {
  let options = {
    hostname: 'localhost',
    port: server.port,
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  let req;
  let promiseRequest = new Promise(resolve => {
    req = http.request(options, res => {
      let resData = '';
      res.on('data', chunk => {
        resData += chunk;
      });
      res.on('close', () => {
        const body = resData ? JSON.parse(resData) : '';
        resolve({
          res,
          body
        });
      });
    });
  });
  req.end(data);
  return await promiseRequest;
}

let sendData;
let sets = [];

sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'GET') });
sendData = { username: 'Alex', age: 11, hobbies: ['Football'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'POST') });
sendData = { username: 'Alex', age: 11, hobbies: ['Football'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + sets[0].result.body.id, 'GET') });
sendData = { username: 'Alex', age: 12, hobbies: ['Football', 'swim'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + sets[0].result.body.id, 'PUT') });
sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + sets[0].result.body.id, 'DELETE') });
sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'GET') });


describe('Scenario 1', () => {
  test('Should return no users', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(set.result.body).toEqual({users: []});
  });

  test('Should create user', () => {

    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(201);
    expect(typeof set.result.body.id).toBe('string');
    expect(set.result.body.username).toBe(set.sendData.username);
    expect(set.result.body.age).toBe(set.sendData.age);
    expect(set.result.body.hobbies).toEqual(set.sendData.hobbies);
  });

  test('Should get user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(typeof set.result.body.id).toBe('string');
    expect(set.result.body.username).toBe(set.sendData.username);
    expect(set.result.body.age).toBe(set.sendData.age);
    expect(set.result.body.hobbies).toEqual(set.sendData.hobbies);
  });

  test('Should update user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(typeof set.result.body.id).toBe('string');
    expect(set.result.body.username).toBe(set.sendData.username);
    expect(set.result.body.age).toBe(set.sendData.age);
    expect(set.result.body.hobbies).toEqual(set.sendData.hobbies);
  });

  test('Should delete user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(204);
  });

  test('Should find no user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(set.result.body).toEqual({users: []});
  });
});

sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/use', 'GET') });
sendData = { username: 'Karl', hobbies: ['Cars'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'POST') });
sendData = { username: 'Karl', age: 22, hobbies: ['Cars'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + uuid.v4(), 'GET') });
sendData = { username: 'John', age: 23, hobbies: ['Fighting'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + '12345', 'PUT') });
sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/', 'DELETE') });
sendData = {};
sets.unshift({ sendData, result: await request('[}[', '/api/users', 'GET') });

describe('Scenario 2', () => {

  test('Should return error if request with bad url', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(404);
    expect(set.result.body.message).toBe('Invalid path, \'/api/users/[id]\' required');
  });

  test('Should return error if body does not contain required fields', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(400);
    expect( set.result.body.message).toBe('Invalid fields in received user.');
  });

  test('Should return error if id do not exist', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(404);
    expect(set.result.body.message).toBe('Invalid id, user doesn\'t exist.');
  });

  test('Should return error if id is invalid', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(400);
    expect(set.result.body.message).toBe('Invalid id format.');
  });

  test('Should return error if request method incorrect', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(404);
    expect(set.result.body.message).toBe('Invalid request method in this resource.');
  });
  test('Should return error if server error', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(500);
    expect(set.result.body.message).toBe('Server error.');
  });

});

sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'GET') });
sendData = { username: 'Karl', age: 22, hobbies: ['Cars'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'POST') });
sendData = { username: 'Karl', age: 22, hobbies: ['Cars'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + sets[0].result.body.id, 'GET') });
sendData = { username: 'John', age: 23, hobbies: ['Fighting'] };
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + sets[0].result.body.id, 'PUT') });
sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users/' + sets[0].result.body.id, 'DELETE') });
sendData = {};
sets.unshift({ sendData, result: await request(JSON.stringify(sendData), '/api/users', 'GET') });


describe('Scenario 3', () => {
  test('Should return no users', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(set.result.body).toEqual({users: []});
  });

  test('Should create user', () => {

    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(201);
    expect(typeof set.result.body.id).toBe('string');
    expect(set.result.body.username).toBe(set.sendData.username);
    expect(set.result.body.age).toBe(set.sendData.age);
    expect(set.result.body.hobbies).toEqual(set.sendData.hobbies);
  });

  test('Should get user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(typeof set.result.body.id).toBe('string');
    expect(set.result.body.username).toBe(set.sendData.username);
    expect(set.result.body.age).toBe(set.sendData.age);
    expect(set.result.body.hobbies).toEqual(set.sendData.hobbies);
  });

  test('Should update user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(typeof set.result.body.id).toBe('string');
    expect(set.result.body.username).toBe(set.sendData.username);
    expect(set.result.body.age).toBe(set.sendData.age);
    expect(set.result.body.hobbies).toEqual(set.sendData.hobbies);
  });

  test('Should delete user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(204);
  });

  test('Should find no user', () => {
    const set = sets.pop();
    expect(set.result.res.statusCode).toBe(200);
    expect(set.result.body).toEqual({users: []});
  });
});

server.stop();
