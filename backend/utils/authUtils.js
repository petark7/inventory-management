// utils/authUtils.js
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('./jwt');

const generateTokensAndRespond = (user, res) => {
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
};

module.exports = generateTokensAndRespond;