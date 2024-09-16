// Import necessary modules
const passport = require('passport');
const bcrypt = require('bcrypt'); // For password hashing and comparison
const localstrategy = require('passport-local').Strategy; //local strategy for Passport
const User = require('../models/signupSchema'); //User model for database interaction

// Configure Passport to use local strategy for authentication
passport.use(new localstrategy({ passReqToCallback: true },
    async function(req, email, password, done, err) {
        if (err) {
            console.log(err); // Log any error during the authentication process
            return;
        }
        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) { 
            req.flash("warning", "Not a Valid User"); // Flash message for invalid user
            return done(null, false); // If user is not found, return false
        }

        // Compare input password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            req.flash("error", "Invalid Username/Password"); // Flash message for incorrect password
            return done(null, false); // If password is incorrect, return false
        }
        
        return done(null, user); // If everything is valid, return the user
    }
));

// Serialize user information to store in the session
passport.serializeUser(function(user, done) {
    return done(null, user); // Store user information in session
});

// Deserialize user information from session
passport.deserializeUser(async function(id, done) {
   try {
       let user = await User.findById(id); // Find user by ID
       if (user) {
           return done(null, user); // Return the user if found
       }
   } catch (err) {
       console.log(err); // Log any error during deserialization
       return;
   }
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) { // If the user is authenticated
        return next(); // Proceed to the next middleware
    }
    return res.redirect('/signin'); // Redirect to sign-in page if not authenticated
};

// Middleware to set the authenticated user in response locals
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Set authenticated user in response locals
    }
    return next();
}

// Export passport configuration
module.exports = passport;
