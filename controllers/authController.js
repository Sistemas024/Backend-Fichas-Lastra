const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registro = require('../models/Registro'); // Importa el modelo Registro

// Función para iniciar sesión de un usuario o administrador
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const usuario = await Registro.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT con el rol incluido
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      'secreto', 
      { expiresIn: '1h' }
    );

    // Redirecciona al usuario a la vista correcta según su rol
    if (usuario.role === 'admin') {
      res.status(200).json({ message: 'Login exitoso', token, role: 'admin', redirectUrl: '/homeAdmin' });
    } else {
      res.status(200).json({ message: 'Login exitoso', token, role: 'user', redirectUrl: '/home' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Función para registrar un usuario
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const existingUser = await Registro.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Registro({
      email,
      password: hashedPassword,
      role: 'user', // Rol predeterminado de usuario
    });

    await newUser.save();
    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al intentar registrar' });
  }
};

// Función para registrar un administrador
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const existingUser = await Registro.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Registro({
      email,
      password: hashedPassword,
      role: 'admin', // Asigna el rol de admin
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Registro de administrador exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al intentar registrar al administrador' });
  }
};
