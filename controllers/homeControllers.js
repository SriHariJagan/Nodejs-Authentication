// -----------REQUIRE MODULES----------------
const signupSchema = require('../models/signupSchema');
const bcrypt = require('bcrypt');


// -----------GET METHODS--------------

// Render the sign-in page
module.exports.signin = (req, res) => {
    res.render('signin', { title: "SignIn Page" }); // Render the sign-in view with a title
}

// Render the sign-up page
module.exports.signup = (req, res) => {
    res.render('signup', { title: "SignUp Page" }); // Render the sign-up view with a title
}



// --------POST METHODS--------------

// Function to hash the password using bcrypt
async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds for hashing
    return await bcrypt.hash(password, saltRounds); // Return the hashed password
}

// Handle sign-up form data submission
module.exports.signupData = async (req, res) => {
    // Check if the default caption matches the user-provided caption
    if (req.body.defaultcaption != req.body.caption) {
        res.redirect('back'); // If captions don't match, redirect back
    }

    // Check if password and confirm password are the same
    if (req.body.password === req.body.confirmpassword) {
        // Check if a user with the same email already exists
        const user = await signupSchema.findOne({ email: req.body.email });
        if (user) {
            req.flash("warning", "This account already exists."); // Flash warning message if account exists
            res.redirect("/signin"); // Redirect to sign-in page
        } else {
            // Create a new user object with hashed passwords
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: await hashPassword(req.body.password), // Hash the password
                confirmpassword: await hashPassword(req.body.confirmpassword) // Hash the confirm password
            }
            // Save the new user to the database
            const newuser = await signupSchema.create(user);
            if (newuser) {
                req.flash("success", "Your account has been successfully created..."); // Flash success message
                res.redirect("/signin"); // Redirect to sign-in page after successful sign-up
            }
        }
    } else {
        res.redirect('back'); // If passwords don't match, redirect back
    }
}



//-------- SignOut-----------

// Handle sign-in form submission (login)
module.exports.signinform = (req, res) => {
    req.flash("success", "Logged in successfully..."); // Flash success message for login
    return res.redirect('/'); // Redirect to home page after successful login
}
