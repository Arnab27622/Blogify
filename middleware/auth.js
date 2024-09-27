const { verifyToken } = require('../service/auth.js');

//! Authentication
async function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }

    try {
        const token = tokenCookie;
        const user = await verifyToken(token);
        req.user = user;
    } catch (error) {
        console.error('Error in token verification:', error.message);
        req.user = null;
    }
    return next();
}

//! Authorization
function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect('/login');
        }
        if (!roles.includes(req.user.role)) {
            return res.end('Unauthorized');
        }
        return next();
    }
}

module.exports = { checkForAuthentication, restrictTo };