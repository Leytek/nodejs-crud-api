# Nodejs-CRUD-API

### Installation
git clone "this repository link"

git checkout dev

npm install

### Running
##### npm scripts:
- run server from sources:
    ```bash
    npm start 
    ```
- build sources
    ```bash
    npm build 
    ``` 
- start dev environment with **nodemon**
    ```bash
    npm start:dev
    ```
- build sources and run from build
    ```bash
    npm start:prod
    ``` 
- start in cluster mode
    ```bash
    npm start:multi
    ``` 
- run tests
    ```bash
    npm test
    ``` 
###Usage
#### Server can process requests with Usr object
```json
{
  "id": "4630c426-041d-4675-9899-970ee4b61828",
  "username": "Alex",
  "age": "29",
  "hobbies": ["Movies", "Cars"]
}
```
#### HTTP requests
- GET api/users is used to get all persons  
    - Server should answer with status code 200 and all users records
- GET api/users/${userId}
    - Server should answer with status code 200 and and record with id === userId if it exists
    - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
- POST api/users is used to create record about new user and store it in database
    - Server should answer with status code 201 and newly created record
    - Server should answer with status code 400 and corresponding message if request body does not contain required fields
- PUT api/users/{userId} is used to update existing user
    - Server should answer with status code 200 and updated record
    - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
- DELETE api/users/${userId} is used to delete existing user from database
    - Server should answer with status code 204 if the record is found and deleted
    - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
