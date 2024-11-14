// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/authenticateToken');

// Ruta solo accesible para admin
router.get('/admin-data', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Datos de administrador' });
});

module.exports = router;
