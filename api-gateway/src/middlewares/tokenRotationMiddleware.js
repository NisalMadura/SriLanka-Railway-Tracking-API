const jwt = require('jsonwebtoken');

// Generate a new JWT token
const generateToken = () => {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
  };

  const secret = process.env.JWT_SECRET || 'Xy4eGNi2pTjRXaCwwhztrbZHQ0mX0D6J0tF5ydM2gfK1k0lRsN3U06O9gBxxtFZp';
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
};

// Middleware to handle token rotation
const tokenRotation = (req, res, next) => {
  try {
    // Generate a new token for public use
    const newToken = generateToken();

    // Attach the new token to the response
    res.setHeader('Authorization', `Bearer ${newToken}`);

    // Optionally, attach it to `req.token` for further use
    req.token = newToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

module.exports = tokenRotation;
