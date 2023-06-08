require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = { verifyToken };