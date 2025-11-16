const db = require("../models/db");
const jwt = require("../utils/jwt");

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isPasswordValid = await user.validatePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            // Generate token (implementation omitted for brevity)
            
            const token = jwt.generateToken({ userId: user.id, email: user.email });

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const existingUser = await db.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const newUser = await db.User.create({ email, passwordHash: await db.User.hashPassword(password) });
            res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};