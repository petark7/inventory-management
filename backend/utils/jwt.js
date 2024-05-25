const jwt = require('jsonwebtoken');

const secret = process.env.JWT_ACCESS_SECRET;

// Generate a JWT token
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };