const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken, generateToken } = require('../../utils/jwt')

// This route fetches user if userID is provided or returns all users if none provided
router.get('/', verifyToken, async (req, res) => {
   if (req.body.userID) {
    try {
        let user = await User.findById(req.userId).select('-password');
        res.status(200).json(
            { 
            message: 'User fetched successfully',
            user: user 
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
   } else
    {
            try {
                let users = await User.find();
                res.status(200).json(
                    { 
                    message: 'Users fetched successfully',
                    users: users 
                });
            } catch (error) {
                res.status(500).json({ error: error });
            }
    }
});

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;