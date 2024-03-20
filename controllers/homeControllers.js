// -----------EQUIRE MODULES----------------
const signupSchema = require('../models/signupSchema');
const bcrypt = require('bcrypt');


// -----------GET METHODS--------------
module.exports.signin = (req,res) => {
    res.render('signin',{title : "SignIn Page"})
}

module.exports.signup = (req,res) => {
    res.render('signup',{title : "SignUp Page"})
}


// --------POST METHODS--------------

async function hashPassword(password) {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
}

module.exports.signupData = async (req,res) => {
    if(req.body.defaultcaption != req.body.caption){
        res.redirect('back');
    }
    if(req.body.password === req.body.confirmpassword){
        const user = await signupSchema.findOne({email : req.body.email});
        if(user){
            req.flash("warning","This account already exists.");
            res.redirect("/signin");
        }else{
            const user = {
                username : req.body.username,
                email : req.body.email,
                password : await hashPassword(req.body.password),
                confirmpassword :await hashPassword(req.body.confirmpassword)
            }
           const newuser =  await signupSchema.create(user);
           if(newuser){
                res.redirect("/signin");
                req.flash("success","Your account has been successfully created...");
           }
        }
    }else{
        res.redirect('back');
    }
}


//-------- SignOut-----------
module.exports.signinform = (req,res) => {
    req.flash("success","Logged in successfully...");
    return res.redirect('/');
}