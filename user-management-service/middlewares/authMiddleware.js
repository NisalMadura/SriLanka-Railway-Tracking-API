const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, 'DAW3bxw-_DNUvxtyWTpbWainCNTdF-aL2-eCqJDokmhchWCL7HKdBFzdY0vIvkpf', (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Failed to authenticate token' });
        if (decoded.roleID !== 1) return res.status(403).json({ error: 'Not an admin' }); 
        next();
    });
}

module.exports = { isAdmin };
