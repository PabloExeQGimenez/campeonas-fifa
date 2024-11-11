const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Falata el token' 
    });
  }

  try {
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido o expirado' });
  }
};

module.exports = { authenticateToken };
