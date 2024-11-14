// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Añade el usuario decodificado al request
    next();
  });
};

// Middleware adicional para verificar roles
exports.authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};
