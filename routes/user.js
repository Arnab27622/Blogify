const express = require('express');
const router = express.Router();
const {
    getSignInPage,
    getSignUpPage,
    postSignUp,
    postSignIn,
    postLogOut,
    getHomePage
} = require('../controllers/user.js');

router.route('/').get(getHomePage)
router.route('/signin').get(getSignInPage).post(postSignIn);
router.route('/signup').get(getSignUpPage).post(postSignUp);
router.route('/logout').get(postLogOut);

module.exports = router;