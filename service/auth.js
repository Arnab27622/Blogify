const jwt = require('jsonwebtoken');
const secret = 'Arnab@12#3';

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    return jwt.sign(payload, secret);
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = { createTokenForUser, verifyToken };