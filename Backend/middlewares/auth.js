const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access forbidden: You do not have the right privileges' });
            }
            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = authMiddleware;
