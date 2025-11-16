const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (payload) => {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // token valid for 1 day
    )   ;
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null;
        }
    }
};