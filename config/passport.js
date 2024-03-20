const passport = require('passport');
const bcrypt = require('bcrypt');
const localstrategy = require('passport-local').Strategy;
const User = require('../models/signupSchema');


passport.use(new localstrategy({passReqToCallback : true},
    async function(req,email, password, done,err){
        if(err){
            console.log(err);
            return;
        }
        const user = await User.findOne({ email :email });
        if (!user) { 
            req.flash("warning","Not a Valid User");
            return done(null, false); 
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
         req.flash("error","Invalid Username/Password");
            return done(null,false);
        }
       return done(null, user);
    }
));


passport.serializeUser(function(user, done) {
    return done(null, user);
});

  
passport.deserializeUser(async function(id,done){
   try{
    let user = await User.findById(id);
    if(user){
        return done(null,user);
    }
   }catch(err){
    console.log(err);
    return;
   }
});

passport.checkAuthentication = function(req, res, next) {
    
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/signin');
};


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
} 


  module.exports = passport;