// Import required modules
const express = require('express');
const passport = require('passport'); 
const router = express.Router(); // Create a new router instance

// Import the user controller for handling user-related routes
const userController = require('../controllers/userControllers');

// Define routes and attach corresponding controller functions and middleware

router.get('/', passport.checkAuthentication, userController.home); // Route for home page, requires authentication
router.get('/signout', passport.checkAuthentication, userController.signout); // Route for sign-out, requires authentication
router.get('/reset', passport.checkAuthentication, userController.reset); // Route for password reset page, requires authentication

router.post('/resetdata', passport.checkAuthentication, userController.resetdata); // Route to handle password reset form submission, requires authentication

module.exports = router; // Export the router to be used in other parts of the application
