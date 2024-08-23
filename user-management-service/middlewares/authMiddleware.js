const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Failed to authenticate token' });
        if (decoded.roleID !== 1) return res.status(403).json({ error: 'Not an admin' }); // Assuming roleID 1 is admin
        next();
    });
}

module.exports = { isAdmin };
