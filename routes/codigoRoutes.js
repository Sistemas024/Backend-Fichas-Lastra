// routes/codigoRoutes.js
const express = require('express');
const router = express.Router();

// Define tus rutas aquí, por ejemplo:
router.get('/', (req, res) => {
    res.send("Ruta de código funcionando");
});

module.exports = router;
