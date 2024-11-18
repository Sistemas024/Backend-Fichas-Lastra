const app = require('./app');
const connectDB = require('./config/db');
const cors = require('cors');

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
