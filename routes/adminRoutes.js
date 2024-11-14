const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Asegúrate de que esta ruta sea correcta

// Ruta para registrar un administrador
router.post('/register', authController.registerAdmin);

// Ruta para iniciar sesión como administrador
router.post('/login', authController.loginAdmin);

module.exports = router;
