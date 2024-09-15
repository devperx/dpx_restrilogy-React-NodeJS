## Version Node JS
  - Node JS VERSION >=14.20.1

## Description of this project

Small reservation system for a restaurant where a customer can make their reservation, then an administrator can see their reservation from their panel.

This project has 6 Endpoints: 
```bash
    - Auth-User:
        http://localhost:4000/api/v1/auth/user-register
        http://localhost:4000/api/v1/auth/user-login

    - Reservation:
        http://localhost:4000/api/v1/reservation/post
        http://localhost:4000/api/v1/reservation/get
        http://localhost:4000/api/v1/reservation/get-search?
        http://localhost:4000/api/v1/reservation/get-reservations-userId/:id
 ```

## AUTH ADMIN

You must create a new user who will be the restaurant employee, your username must be "adminOK" and password can be any: 
                            
```bash
  EG: ADMIN REGISTRATION 
    - User: adminOK
    - Pass: 123
 ```

## Required file

You need to create an .env file to make use of the variables, same height as package.json file: 

```bash
  ADMIN:
    - PORT=4000
    - PORT_BACKEND_LOCAL=4000
    - JWT_KEYWORD=ñishdahdlahsdjahsdñkashdkjshldjjlqwe
```

## Run the application

To run this app you must do this:

```bash
  npm install
  npm start

  Listen on port: 3000 --> http://localhost:3000
```

## Used Libraries

```bash
  Bcrypt Node JS VERSION 0.0.3
  Body Parser VERSION ^1.20.2
  Cors VERSION ^2.8.5
  Dotenv VERSION ^16.3.1
  Express JS VERSION ^4.18.2
  JWT Simple VERSION ^0.5.6
  Moment JS ^2.29.4
  MySQL 2 VERSION ^3.5.2
  Nodemon VERSION ^3.0.1
```
  
  
