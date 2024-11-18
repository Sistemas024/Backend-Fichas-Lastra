const app = require('./app');
const connectDB = require('./config/db');
const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: 'https://fichas-tecnicas-lastra.vercel.app', // El dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Aplica CORS a todas las rutas
app.use(cors(corsOptions));

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
