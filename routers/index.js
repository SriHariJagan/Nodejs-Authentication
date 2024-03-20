const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../controllers/homeControllers');

router.use('/',require('./home'));

// Get Methods
router.get('/signin', homeController.signin);
router.get('/signup', homeController.signup);

// Post Methods
router.post('/signupData', homeController.signupData);
router.post('/signinform', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), homeController.signinform);


// Google Authoritication
router.get('/auth/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get( '/home/auth/google/callback',passport.authenticate( 'google', {failureRedirect: '/signup',failureFlash: true}),homeController.signinform);


module.exports = router;
