const User = require('../models/user.js');
const Blogs = require('../models/blog.js');

async function getHomePage(req, res) {
    const allBlogs = await Blogs.find().sort({ createdAt: 1 }).lean();
    res.render('homepage', {
        user: req.user,
        blogs: allBlogs
    });
};

function getSignInPage(req, res) {
    return res.render('signin');
};

function getSignUpPage(req, res) {
    return res.render('signup');
};

async function postSignUp(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });
    return res.redirect('/');
}

async function postSignIn(req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: 'Invalid email or password'
        });
    }
}

async function postLogOut(req, res) {
    res.clearCookie('token');
    return res.redirect('/');
}

module.exports = {
    getSignInPage,
    getSignUpPage,
    postSignUp,
    postSignIn,
    postLogOut,
    getHomePage
};