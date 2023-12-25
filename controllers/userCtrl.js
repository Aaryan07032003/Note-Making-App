const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Replace 'your_secret_key' with your desired secret key
const yourSecretKey = 'aaryan';

const userCtrl = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await Users.findOne({ email: email });
            if (user) return res.status(400).json({ msg: 'The email already exists' });

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash,
            });
            await newUser.save();
            res.json({ msg: 'Sign up Success' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email: email });
            if (!user) return res.status(400).json({ msg: 'User does not exist.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

            // If login success, create token using the provided secret key
            const payload = { id: user._id, name: user.username };
            const token = jwt.sign(payload, yourSecretKey, { expiresIn: '1d' });

            res.json({ token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    verifiedToken: (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token) return res.send(false);

            jwt.verify(token, yourSecretKey, async (err, verified) => {
                if (err) return res.send(false);

                const user = await Users.findById(verified.id);
                if (!user) return res.send(false);

                return res.send(true);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = userCtrl;
