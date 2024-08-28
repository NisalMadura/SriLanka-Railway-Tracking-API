const { auth } = require('express-oauth2-jwt-bearer');
const jwksRsa = require('jwks-rsa');

// Middleware to check JWT and validate tokens
const checkJwt = auth({
  audience: 'http://localhost:3003',
  issuerBaseURL: 'https://dev-ar027xwo2e4pbbqk.us.auth0.com/',
  tokenSigningAlg: 'RS256',
  jwksUri: 'https://dev-ar027xwo2e4pbbqk.us.auth0.com/.well-known/jwks.json',
});

// Middleware to grant access to all valid tokens
const checkAdminRole = (req, res, next) => {
  if (req.auth) {
    next(); // If token is valid, grant access
  } else {
    res.status(403).send('Access denied'); // If token is not valid, deny access
  }
};

module.exports = {
  checkJwt,
  checkAdminRole,
};
