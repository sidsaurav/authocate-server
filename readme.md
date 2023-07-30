
# authocate-server

authocate-server is a powerful Node.js middleware that simplifies authentication and user management for your Express applications. 

You can add authentication to your web app using **just one line of code**. It supports authentication using username and password, and JWT tokens. 

It also provides endpoints for user management like updating user, getting user by ID, etc.

> This is just an initial version and I am planning to add more features in future and make it more robust and secure.
> I am also planning to make a client side authocate to easily connect with this package and make it cheesewalk to handle authentications.
> Your feedbacks would be highly appreciated. :smile:. Do contact me on siddharthsaurav15@gmail.com for any queries or suggestions.

## Table of Contents

- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [API DOCUMENTATION](#api-documentation)
    - [1. Login User](#1-login-user)
    - [2. Get Logged in User](#2-get-logged-in-user)
    - [3. Signup User](#3-signup-user)
    - [4. Update User](#4-update-user)
    - [5. Get User by ID](#5-get-user-by-id)
- [License](#license)

## Installation

Just do `npm install authocate/server` and you are good to go. :v:

## Setup Instructions 

 - Required packages to be installed alongside `authocate-serve`
	 - Express.js
	 - Mongoose (currently only MongoDB supported)
	 - dotenv
### Follow these steps to get started -
1. Setup express and create an app instance -
 
```js
const  express  =  require('express') 
const  app  =  express()`
```

2. Setup dotenv and write your JWT secret key in the env file as shown below -
```js
const  dotenv  =  require('dotenv')
dotenv.config()
```
in the env file : **JWT_SECRET_KEY  =  'yourlittlesecret'**
3. Add `app.use(express.json())` middleware to handle json data.

4. Define a connectDB function which will connect to DB using mongoose and <u>save the connection instance in a variable</u>. Later, we will need this variable to talk to our MongoDB database.
5. Install the **authocate-server** package using `npm i authocate-server` and require it.
6. Create an instance of `authocate-server` and pass the following parameter in specified order to function.
	1. `app` (express instance)
	2. `mongoose connection object`
	3. `JWT SECRET KEY`

	To further simplify step 6 
	- create a connectDB.js file
	- inside that define an async function which connects to MongoDB server and return connection object. 
	- Now export the function and import it in index.js. 
	- After this you can use .then() to invoke the authocate-server instance.

>*Still having confusions??* :no_mouth::no_mouth: 

>*It's okay darling, I got you covered just use following code*  :smile:

>*and don't forget to star my github repo and follow me on github* :smirk:

### connectDB.js
```js
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)

    return conn
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
module.exports = connectDB

```

### index.js
```js
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./db.js')
const PORT = 5000
app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`)
})

app.use(express.json())
const authocate = require('authocate')
connectDB().then((conn) => authocate(app, conn, process.env.JWT_SECRET_KEY))
```

## API DOCUMENTATION

### 1. Login User

- ENDPOINT : `/api/auth/login`
- Method: **`POST`**
- Description: Endpoint to authenticate a user and obtain an access token.
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "password": "123456"
  }
  ```
 - **Response Body**:
	 
	```json
	{
	    "_id": "64c3ebc4ed78a34e74c153fe",
	    "username": "newuser",
	    "email": "newuser@gmail.com",
	    "profilePic": "https://www.nicepng.com/png/detai...",
	    "createdAt": "2023-07-28T16:24:36.749Z",
	    "updatedAt": "2023-07-28T16:24:36.749Z",
	    "__v": 0,
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cC..."
	}
	 ```


### 2. Get Logged in User

- ENDPOINT : `/api/auth/login`
- Method: **`GET`**
- Headers: Authorisation = Bearer Token
- Description: Get details of logged in user.
 - Response Body:
	```json
	{
	    "_id": "64c3ebc4ed78a34e74c153fe",
	    "username": "newuser",
	    "email": "newuser@gmail.com",
	    "profilePic": "https://www.nicepng.com/png/de...",
	    "createdAt": "2023-07-28T16:24:36.749Z",
	    "updatedAt": "2023-07-28T16:24:36.749Z",
	    "__v": 0
	}
	```
  
### 3. Signup User

- ENDPOINT : `/api/auth/signup`
- Method: **`POST`**
- Description: Endpoint to register a user.
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "password": "123456",
    "email":"newuser@gmail.com"
  }
  ```
 - **Response Body**:
	  ```json
	  {
	    "message": "User created",
	    "user": {
	        "username": "newuser",
	        "email": "newuser@gmail.com",
	        "profilePic": "https://www.nicepng.com/p...",
	        "_id": "64c3ebc4ed78a34e74c153fe",
	        "createdAt": "2023-07-28T16:24:36.749Z",
	        "updatedAt": "2023-07-28T16:24:36.749Z",
	        "__v": 0,
	        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
	    }
	}
	  ```
	  
### 4. Update User

- ENDPOINT : `/api/auth/update`
- Method: *`PATCH`**
- Description: Endpoint to update logged in user.
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "secretpassword"
  }
  ```
 - **Response Body**:
	  ```json
	  {
	    "message": "User updated successfully!",
	    "updatedUser": {
	        "_id": "64c3ebc4ed78a34e74c153fe",
	        "username": "newuser",
	        "email": "heyo@gmail.com",
	        "profilePic": "https://www.nicepng.com/png/detail/93...",
	        "createdAt": "2023-07-28T16:24:36.749Z",
	        "updatedAt": "2023-07-30T20:13:15.816Z",
	        "__v": 0
	    }
	}
	  ```



### 5. Get User by ID

- ENDPOINT : `/api/user/:id`
- Method: **`GET`**
- Description: Endpoint to get a user by its ID.
- Params : ID of User
 - **Response Body**:
	  ```json
	  {
	    "_id": "64c3ebc4ed78a34e74c153fe",
	    "username": "newuser",
	    "email": "heyo@gmail.com",
	    "profilePic": "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png",
	    "createdAt": "2023-07-28T16:24:36.749Z",
	    "updatedAt": "2023-07-30T20:13:15.816Z",
	    "__v": 0
	}	
	  ```



