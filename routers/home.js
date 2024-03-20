const express= require('express');
const passport = require('passport')
const router = express.Router();

const userController = require('../controllers/userControllers')

router.get('/',passport.checkAuthentication,userController.home);
router.get('/signout',passport.checkAuthentication,userController.signout);
router.get('/reset',passport.checkAuthentication,userController.reset);

router.post('/resetdata',passport.checkAuthentication,userController.resetdata);

module.exports = router;