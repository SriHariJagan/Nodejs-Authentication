const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 
const crypto = require('crypto');
const User = require('../models/signupSchema');

passport.use(new GoogleStrategy({
    clientID:     "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET" ,
    callbackURL: "http://localhost:8000/home/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) { 
       try{
            console.log(profile);
            const user = await User.findOne({ email: profile.emails[0].value});
            if(user){
                return done(null,user);
            }else{
               const newUser = await User.create(
                    {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }
                );
                if(newUser){
                    return done(null,newUser);
                }
            }
       }catch(err){
            console.log(err);
       }
  }
));

module.exports = passport;
