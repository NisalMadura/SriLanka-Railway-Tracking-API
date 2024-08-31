
// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user = { id: 'test-user', roles: [] }) => {
  const payload = {
    sub: user.id,
    roles: user.roles, 
    exp: Math.floor(Date.now() / 1000) + (60 * 60), 
  };

  const secret = process.env.JWT_SECRET || 'Xy4eGNi2pTjRXaCwwhztrbZHQ0mX0D6J0tF5ydM2gfK1k0lRsN3U06O9gBxxtFZp'; 
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
};

module.exports = { generateToken };
