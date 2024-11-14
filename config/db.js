const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const dbURI = 'mongodb+srv://sistemasrl021:Systems0125*@cluster0.tj9st.mongodb.net/FichasTecnicas?retryWrites=true&w=majority&appName=Cluster0'; // URI de la base de datos de MongoDB
    if (!dbURI) {
      throw new Error("La URI de la base de datos no está definida.");
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);  // Detener el servidor si la conexión falla
  }
};

module.exports = connectDB;
