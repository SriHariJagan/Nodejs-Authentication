// Import necessary modules
const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Google OAuth strategy
const crypto = require('crypto'); // Module to generate random strings for password
const User = require('../models/signupSchema'); // Import User model for database interaction

// Configure Passport to use Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID:     "1075841977654-sejoqansr7o3c6agp17o873d6khudk0e.apps.googleusercontent.com", // Google client ID
    clientSecret: "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", // Google client secret
    callbackURL: "http://localhost:8000/home/auth/google/callback", // Callback URL after Google login
    passReqToCallback: true // Pass request to callback function
  },
  async function(request, accessToken, refreshToken, profile, done) {
       try {
            console.log(profile); // Log Google profile information for debugging

            // Check if user already exists in the database
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                // If user exists, return the user
                return done(null, user);
            } else {
                // If user doesn't exist, create a new user
                const newUser = await User.create({
                    name: profile.displayName, // Set name from Google profile
                    email: profile.emails[0].value, // Set email from Google profile
                    password: crypto.randomBytes(20).toString('hex') // Generate a random password
                });
                if (newUser) {
                    // If user is successfully created, return the new user
                    return done(null, newUser);
                }
            }
       } catch(err) {
            console.log(err); // Log any errors
       }
  }
));

// Export passport configuration
module.exports = passport;
