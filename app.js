const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());  // Para poder manejar los cuerpos JSON
app.use(cors());  // Para permitir solicitudes desde otros orígenes

// Rutas
app.use('/auth', authRoutes);  // Usa las rutas de auth (login y register)

module.exports = app;
