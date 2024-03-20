const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/signupSchema');

module.exports.home = (req,res) => {
    res.render('home',{title : "Home Page"})
}

module.exports.signout = (req,res) => {
    return req.logout(req.user,function(err) {
        if (err) { return next(err); }
        req.flash("success","Signed Out successfully...");
        res.redirect('/signin');
      });

}

module.exports.reset = (req,res) => {
    res.render('resetpassword',{title : "Reset Password"});
}

async function hashPassword(password) {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
}

module.exports.resetdata = async (req,res) => {

    if(req.body.password === req.body.confirmpassword){
        const email = req.user.email;
        const password = await hashPassword(req.body.password);
        const confirmpassword = await hashPassword(req.body.confirmpassword);
        try{
            const user = await User.findOneAndUpdate({email:email});
            user.password = password;
            user.confirmpassword = confirmpassword;
            user.save();
            req.flash("success","Password Changed Successfully....");
            res.redirect('/');
        }catch(err){
            console.log(err);
            return;
        }
    }
    else{
        req.flash("error","Not Matched..");
        res.redirect('back');
    }
    
}
