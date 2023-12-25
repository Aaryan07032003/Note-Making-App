const jwt = require('jsonwebtoken');

// Hardcoded secret key (not recommended for production)
const hardcodedSecretKey = 'aaryan';

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(400).json({ msg: 'Invalid Authentication' });

        jwt.verify(token, hardcodedSecretKey, (err, user) => {
            if (err) return res.status(400).json({ msg: 'Authorization not valid' });

            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = auth;
