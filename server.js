const app = require('./app');
const connectDB = require('./config/db');
const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: 'https://fichas-tecnicas-lastra.vercel.app', // El origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

// Aplicar CORS a todas las rutas
app.use(cors(corsOptions));

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
