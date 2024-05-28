const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken, generateAccessToken, generateRefreshToken } = require('../../utils/jwt')

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

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save the refresh token in a cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // use 'secure' in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

         // Remove password from user object before sending response
         const userResponse = {
            ...user.toObject(),
            password: undefined
        };

        res.json({ accessToken, user: userResponse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post('/token', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateAccessToken(decoded.userId);

         // Fetch user data
         const user = await User.findById(decoded.userId).select('-password');
         if (!user) {
             return res.status(404).json({ message: 'User not found' });
         }
 
         res.json({ accessToken: newAccessToken, user });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token.' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;