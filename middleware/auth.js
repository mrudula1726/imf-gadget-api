const jwt = require('jsonwebtoken');

// Middleware function to verify JWT
const authMiddleware = (req, res, next) => {
    // Get token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is provided, deny access
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach decoded user info to request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
