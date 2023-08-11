# authocate-server
### THIS PROJECT IS STILL IN DEV PHASE and THERE CAN BE FEW BUGS. PLEASE REPORT IF YOU FIND ANY.


For any query and discussion please connect with me
- [![Gmail](https://img.icons8.com/fluency/15/null/gmail.png) siddharthsaurav15@gmail.com](mailto::siddharthsaurav15@gmail.com)
- [![Linkedin](https://i.stack.imgur.com/gVE0j.png) linkedin.com/in/siddharth-saurav/](https://www.linkedin.com/in/siddharth-saurav/)
- [![Twitter](https://img.icons8.com/fluency/15/null/twitter.png) twitter.com/sidsauravdev](https://twitter.com/sidsauravdev)

## Introduction
**authocate-server** is a powerful, yet very beginner friendly Node.js middleware that simplifies authentication and user management for your Express applications. It requires minimal setup and you can add authentication to your web app using **just one line of code**.

### Primary Credentials for login as of now are email and password which can be changed in future development.
## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Custom and Default User Schema](#user-schema)
- [Custom Protected Routes](#custom-protected-routes)
- [Rate Limitting](#rate-limitting)
- [API DOCUMENTATION](#api-documentation)
    - [1. Login User](#1-login-user)
    - [2. Get Logged in User](#2-get-logged-in-user)
    - [3. Signup User](#3-signup-user)
    - [4. Update User](#4-update-user)
    - [5. Get User by ID](#5-get-user-by-id)
- [Future Development](#future-development)
- [Contribute](#contribute)

## Features
- User Authentication: Effortlessly handle user registration and login with secure password hashing using **bcrypt** and **JWT**-based authentication.

- Custom Protected Routes: You will be getting a **middleware** function to add your own protected routes and check whether the user is logged in and valid, ensuring only authenticated users can access that.

- Custom User Schema: As one size can't fit all, one schema can't meet all requirement. Now you can create userSchema as per your own requirement and pass it as an argument, or use our default user schema.

- Rate Limiting: Protect your application from brute-force attacks and potential security threats by limiting the number of requests per IP address.

- User Management: Easily manage user's details through our API.

- Salable & Easy-to-Use: Authocate is built on top of **Express** and **Mongoose**, making it simple to integrate into your existing Express applications.

-   **Still not convinced?** 😐 This package contains the necessary endpoints for authentication. You can add as many protected endpoints as needed for your app by using our authorization middleware.

Feel free to explore the power of this npm package and create secure and robust authentication for your web applications. If you have any questions or need assistance, don't hesitate to reach out. Happy coding! 🚀
## Setup Instructions

 - Required packages to be installed alongside `authocate-server`
	 - Express.js
	 - Mongoose (currently only MongoDB supported)
	 - dotenv
### Follow these steps to get started -

1. Just do `npm i authocate-server` to get the package.

2. Setup express and create an app instance -
 
```js
const  express  =  require('express') 
const  app  =  express()
```

3. Setup dotenv and write your JWT secret key in the env file as shown below -
```js
const  dotenv  =  require('dotenv')
dotenv.config()
```
	in the env file write the following-
    - JWT_SECRET_KEY  =  'yourcollegecrush'
    - MONGO_URI = 'yourmongouri'

4. Add `app.use(express.json())` middleware to handle json data.

5. Install the **authocate-server** package using `npm i authocate-server` and require it by creating an instance of it which will be an object. You can destructure authocate function from it.

```js
const {authocate} = require('authocate-server')
```

6.  Connect to MongoDB using mongoose.
	Pass the following parameter in specified order to authocate function.
	1. `app` (express instance)
	2. `mongoose connection object`
	3. `JWT SECRET KEY`
   For this you can use promise chaining.

>*Still having confusions??* :no_mouth::no_mouth: 
>*It's okay darling, I got you covered just use following code snippet*  :smile:
>*and don't forget to star my github repo and follow me on github* :smirk:

### 
```js
const {authocate, authorize, rateLimiter} = require('authocate-server')
const mongoose = require('mongoose')
try {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`)
      authocate(app, conn, process.env.JWT_SECRET_KEY)
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    })
} catch (error) {
  console.error(`Error: ${error.message}`)
  process.exit(1)
}
```
## Usage

You can use the built-in API endpoints for user authentication and management. These endpoints are:

-   **`POST /api/auth/login`**: Authenticate a user and obtain an access token.
-   **`GET /api/auth/login`**: Get details of the logged-in user.
-   **`POST /api/auth/signup`**: Register a new user.
-   **`PATCH /api/auth/update`**: Update the logged-in user's details.
-   **`GET /api/user/:id`**: Get a user's details by their ID.

## User Schema

You can use our default user schema or create your own. 

### Using Custom User Schema

You can pass your own user schema in fourth parameter of authocate function which is an custom object. The key should be `userSchema` and value should be your custom user schema.

**Usage**

```js
authocate(app, conn, process.env.JWT_SECRET_KEY, { userSchema: customUserSchema})
```
**Points to remember while create a custom user schema**

- The userSchema must have `email` and `password` fields.
- The email field must have `required` as `true`.
- The email field must have `unique` as `true`.
- The password field must have `required` as `true`.
- The email and password fields must have `type` as `String`.
- You should add proper validation to the email and password fields.

A sample custom user schema

```js
// sample custom user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\+[0-9]{1,3}-[0-9]{6,14}$/,
  },
})

```
### Using Default User Schema

You can skip using custom userSchema in the fourth parameter if you want to use the default user schema.

 The default user schema is as follows:

```js
// default user schema

const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        format: 'email',
      },
      password: {
        type: String,
        required: true,
	    validate: {...}
      },
      username: {
        type: String,
        default: 'User',
      },
      profilePic: {
        type: String,
        default:
          'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
      },
})
```



## Custom Protected Routes
You can add your own protected endpoints by using `authorise` middleware which takes in a JWT token as its argument. Below code snippet will explain the usage clearly

Make sure to use `application/json` as `content-type` in the header of your request.

```js
const { authorize } =  require('authocate-server')

app.get('/authaccessonly', authorize(process.env.JWT_SECRET_KEY), (req, res) =>
res.json({ message: 'The person is authorised' })
)
// Here we are going through "authorise" middleware to first check about user authorisation and then proceed to endpoint logic.
```

## Rate Limitting

Rate limiting is a technique used to control the rate of requests sent to a server. It is used to prevent brute-force attacks and potential security threats.

Authocate uses the `express-rate-limit` package to implement rate limiting. You can configure the rate limit by destructing `rateLimiter` function from `authocate-server` and passing the following parameters in order.

- timeInMs: The time window in milliseconds for which requests are checked.
- maxRequests: The maximum number of requests allowed in the time window.

```js
const { rateLimiter } = require('authocate-server')
const limiter = rateLimiter(60 * 1000, 15) // 15 requests per minute
app.get("/someendpoint", limiter, (req, res) => {
    // your logic
    res.json({message: "bye gn sd tc"})
})

```

Response Body if rate limit is exceeded
```json
{    
    "error": "Too many requests, please try again later."
}
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
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cC...",
 	    "message": "Logged in successfully!",
	}
	```

### 2. Get Logged in User

- ENDPOINT : `/api/auth/login`
- Method: **`GET`**
- Headers {Authorisation : Bearer Token}
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
- Compulsory Fields : username, password, email
- Optional Fields : profilePic
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
        "username": "newuser",
        "email": "newuser@gmail.com",
        "profilePic": "https://www.nicepng.com/p...",
        "_id": "64c3ebc4ed78a34e74c153fe",
        "createdAt": "2023-07-28T16:24:36.749Z",
        "updatedAt": "2023-07-28T16:24:36.749Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
        "message": "User created",
    }
    ```
	  
### 4. Update User

- ENDPOINT : `/api/auth/update`
- Method: **`PATCH`**
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
        "_id": "64c3ebc4ed78a34e74c153fe",
        "username": "newuser",
        "email": "heyo@gmail.com",
        "profilePic": "https://www.nicepng.com/png/detail/93...",
        "createdAt": "2023-07-28T16:24:36.749Z",
        "updatedAt": "2023-07-30T20:13:15.816Z",
        "__v": 0,
        "message": "User updated successfully!"
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
	    "profilePic": "https://www.nicepng.com/png/detail/933-933...",
	    "createdAt": "2023-07-28T16:24:36.749Z",
	    "updatedAt": "2023-07-30T20:13:15.816Z",
	    "__v": 0
	}	
	```


## Future Development


This is just a start for a very robust and secure authentication system, and I will be constantly improving the package. Some ideas to implement in the future include:

1.  **Custom User Schema**: Allow users to define and use their own custom user schema, providing more flexibility and customization options for different applications.
    
2.  **Forget Password Option**: Implement a "Forget Password" feature that allows users to reset their passwords through a secure process, such as email verification or security questions.
    
3.  **Client-Side User Authentication**: Create a separate npm package specifically designed for client-side user authentication management. This package will seamlessly connect with the authocate-server package, making the overall user authentication experience smooth and hassle-free for developers.
    
4.  **Token Expiration and Refresh**: Implement token expiration and refresh mechanisms to enhance security and prevent unauthorized access. Also usage of http-only cookie will be implemented to prevent alien js code to interact with the authentication system

5. **IP Blocking**: Add rate-limiting and IP blocking functionalities to protect against brute-force attacks and potential security threats.

6. **Block Temp Email**: Add functionality to block temporary email addresses to prevent spamming and fake accounts.

## Contribute

When it comes to managing a Open Source project I'm just a beginner and learning, If anyone want to raise a PR or want to have a chat with me regarding the project and contributions, please connect with me.

Email ID:  siddharthsaurav15@gmail.com

Linkedin : https://www.linkedin.com/in/siddharth-saurav/

Twitter : https://twitter.com/sidsauravdev

Cheers! :v::v:
