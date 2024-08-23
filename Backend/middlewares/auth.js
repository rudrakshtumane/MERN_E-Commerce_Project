const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).send({ msg: 'Token is not valid' });
    }
};

exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ msg: 'Access denied, admin only' });
    }
    next();
};