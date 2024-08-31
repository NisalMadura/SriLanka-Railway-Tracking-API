const { auth } = require('express-oauth2-jwt-bearer');
const jwksRsa = require('jwks-rsa');


const checkJwt = auth({
  audience: 'http://localhost:3003',
  issuerBaseURL: 'https://dev-ar027xwo2e4pbbqk.us.auth0.com/',
  tokenSigningAlg: 'RS256',
  jwksUri: 'https://dev-ar027xwo2e4pbbqk.us.auth0.com/.well-known/jwks.json',
});


const checkAdminRole = (req, res, next) => {
  if (req.auth) {
    next(); 
  } else {
    res.status(403).send('Access denied'); 
  }
};

module.exports = {
  checkJwt,
  checkAdminRole,
};
