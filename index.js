const express = require('express');
const port = 8000;
const app = express();

const layout = require('express-layouts');
const db = require('./config/mongoose');        //for DataBase
const session = require('express-session');     
const cookieParser = require('cookie-parser');
// Passport Authoritication 
const passport = require('passport');
const LocalStrategy = require('./config/passport');
const googleStrategy = require('./config/googleAutho');

// Flash Messages
const connectFlash = require('connect-flash');
const flashMiddleware = require('./config/flashmessage'); 

app.set('view engine', 'ejs');

app.use(layout)
app.use(express.static('asserts'));
app.use(cookieParser()); 
app.use(express.urlencoded());

app.use(session({
    name: 'Myapp',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(connectFlash());
app.use(flashMiddleware.setFlash);

// Routes setup
app.use('/', require('./routers'));

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Express is working...');
});
