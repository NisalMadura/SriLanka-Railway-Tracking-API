const jwt = require('jsonwebtoken');


const generateToken = () => {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60), 
  };

  const secret = process.env.JWT_SECRET || 'Xy4eGNi2pTjRXaCwwhztrbZHQ0mX0D6J0tF5ydM2gfK1k0lRsN3U06O9gBxxtFZp';
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
};


const tokenRotation = (req, res, next) => {
  try {
    
    const newToken = generateToken();

    
    res.setHeader('Authorization', `Bearer ${newToken}`);

    
    req.token = newToken;

    
    next();
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

module.exports = tokenRotation;
