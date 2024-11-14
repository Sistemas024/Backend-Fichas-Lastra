const mongoose = require('mongoose');

// Definimos el esquema para los usuarios
const registroSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',  // Puedes asignar un rol predeterminado
    },
});

// Crear el modelo a partir del esquema
const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;
