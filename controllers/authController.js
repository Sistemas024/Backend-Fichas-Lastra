const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registro = require('../models/Registro'); // Importa el modelo Registro

// Función para registrar un usuario
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Verifica que ambos campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Verifica si el correo ya está registrado
    const existingUser = await Registro.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Cifra la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario con los datos proporcionados
    const newUser = new Registro({
      email,
      password: hashedPassword,
    });

    // Guarda el nuevo usuario en la base de datos
    await newUser.save();

    // Responde con éxito
    res.status(201).json({ message: 'Registro exitoso' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al intentar registrar' });
  }
};

// Función para iniciar sesión de un usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Verifica que ambos campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Busca el usuario en la colección Registro
    const usuario = await Registro.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT con el rol incluido
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      'secreto', // Clave secreta
      { expiresIn: '1h' }
    );

    // Devuelve el token y el rol
    res.status(200).json({ message: 'Login exitoso', token, role: usuario.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
