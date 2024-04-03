
# Node.js Authentication System

A simple authentication system implemented in Node.js using Express and Passport.js.

## Features

- User registration with email and password
- User login with email and password
- User login with Google OAuth2
- Password encryption for secure storage




## Prerequisites

- Node.js installed on your machine
- MongoDB database (local or remote) for storing user data
- Google OAuth2 credentials (client ID and client secret) for Google login feature


## Directory Structure

            │
            ├── asserts/
            │   ├── CSS/
            │      ├── home.css
            │      ├── resetpassword.css
            │      ├── signin.css
            │      └── signup.css
            │   
            │       
            │
            ├── config/
            │   ├── flashmessage.js
            │   ├── googleAutho.js
            │   ├── mongoose.js
            │   └── passport.js
            │
            ├── controllers/
            │   ├── homeControllers.js
            │   └── userControllers.js
            │
            ├── models/
            │   └── signupSchema.js
            │
            ├── routers/
            │   ├── home.js
            │   └── index.js
            │
            └── views/
                ├── forgotpassword.ejs
                ├── home.ejs
                ├── layout.ejs
                ├── resetpassword.ejs
                ├── signin.ejs
                └── signup.ejs

  


# Getting Started

1. Clone the repository:

  - https://github.com/SriHariJagan/Nodejs-Authentication.git



2. Install dependencies:
   - npm install

   

4. Set up environment variables:
   
  - Create a .env file in the root directory
  - Define the following environment variables:
  - PORT=8000
  -  MONGODB_URI=mongodb://localhost:27017/authentication
  -  SESSION_SECRET=your_session_secret
  - GOOGLE_CLIENT_ID=your_google_client_id
  -  GOOGLE_CLIENT_SECRET=your_google_client_secret

## Live Demo:
 - https://nodejs-authentication-tx5t.onrender.com 



4. Run the application:
   - npm start

6. Open your web browser and navigate to `http://localhost:8000` to access the application.

