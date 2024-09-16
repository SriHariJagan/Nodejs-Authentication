// Import necessary modules
const passport = require('passport');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/signupSchema'); // Import User model for interacting with the database

// Render the home page
module.exports.home = (req, res) => {
    res.render('home', { title: "Home Page" }); // Render the home view with a title
}

// Handle user sign-out
module.exports.signout = (req, res) => {
    // Log out the user and destroy their session
    return req.logout(req.user, function(err) {
        if (err) { return next(err); } // Handle any errors during logout
        req.flash("success", "Signed Out successfully..."); // Flash success message
        res.redirect('/signin'); // Redirect to the sign-in page
    });
}

// Render the reset password page
module.exports.reset = (req, res) => {
    res.render('resetpassword', { title: "Reset Password" }); // Render the reset password view
}

// Helper function to hash the password
async function hashPassword(password) {
    const saltRounds = 10; // Define the number of salt rounds for hashing
    return await bcrypt.hash(password, saltRounds); // Return the hashed password
}

// Handle reset password form submission
module.exports.resetdata = async (req, res) => {
    // Check if password and confirm password fields match
    if (req.body.password === req.body.confirmpassword) {
        const email = req.user.email; // Get the user's email from the session
        const password = await hashPassword(req.body.password); // Hash the new password
        const confirmpassword = await hashPassword(req.body.confirmpassword); // Hash the confirm password

        try {
            // Find the user by email and update their password
            const user = await User.findOneAndUpdate({ email: email });
            user.password = password; // Update password
            user.confirmpassword = confirmpassword; // Update confirm password
            user.save(); // Save the updated user data

            req.flash("success", "Password Changed Successfully...."); // Flash success message
            res.redirect('/'); // Redirect to the home page
        } catch (err) {
            console.log(err); // Log any errors
            return;
        }
    } else {
        req.flash("error", "Passwords do not match."); // Flash error message if passwords don't match
        res.redirect('back'); // Redirect back to the form
    }
}
