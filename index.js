//Express framework
const express = require('express');

// Set the port for the server
const port = 8000;

// Initialize the Express app
const app = express();

//express layouts for templating
const layout = require('express-layouts');

// mongoose database connection configuration
const db = require('./config/mongoose');

// session management
const session = require('express-session');

//  cookie parser to handle cookies
const cookieParser = require('cookie-parser');

//Passport for authentication
const passport = require('passport');

// local strategy for Passport authentication
const LocalStrategy = require('./config/passport');

// Google OAuth strategy for Passport
const googleStrategy = require('./config/googleAutho');

// Import flash messages middleware for displaying notifications
const connectFlash = require('connect-flash');

//  custom middleware for flash messages
const flashMiddleware = require('./config/flashmessage');

// Set the view engine to EJS for rendering templates
app.set('view engine', 'ejs');

// Use express layouts
app.use(layout);

// Serve static files from the 'asserts' directory
app.use(express.static('asserts'));

// Use cookie parser middleware to parse cookies
app.use(cookieParser());

// Parse incoming URL-encoded form data
app.use(express.urlencoded());

// Set up session middleware
app.use(session({
    name: 'Myapp',             
    secret: 'keyboard cat',    
    resave: false,             
    saveUninitialized: true,  
    cookie: {
        maxAge: 1000 * 60 * 10 // session cookie expiration (10 minutes)
    }
}));

// Initialize Passport for authentication
app.use(passport.initialize());

// Enable Passport to manage sessions
app.use(passport.session());

// Middleware to set the authenticated user in locals
app.use(passport.setAuthenticatedUser);

// Use flash messaging middleware for notifications
app.use(connectFlash());

// Custom middleware to set flash messages in response
app.use(flashMiddleware.setFlash);

// Set up the routes for the app
app.use('/', require('./routers'));

app.listen(port, (err) => {
    if (err) {
        console.error(err); // Log errors if server fails to start
        return;
    }
    console.log('Express is working...'); // Log success message when server starts
});
