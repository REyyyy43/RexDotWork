import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PROD || "mongodb://localhost:27017/rexy_prod"
      : process.env.MONGO_URI_DEV || "mongodb://localhost:27017/rexy_dev";

    console.log("🔗 Intentando conectar a MongoDB:", mongoUri);

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB conectado exitosamente:", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error);
    console.log("💡 Soluciones posibles:");
    console.log("   1. Instala MongoDB localmente: https://docs.mongodb.com/manual/installation/");
    console.log("   2. Ejecuta MongoDB: mongod");
    console.log("   3. O configura MONGO_URI_DEV con tu conexión de MongoDB Atlas");
    console.log("   4. Crea un archivo .env en la carpeta backend con:");
    console.log("      MONGO_URI_DEV=mongodb://localhost:27017/rexy_dev");
    console.log("      JWT_SECRET=tu_secret_aqui");
    process.exit(1);
  }
};

export default connectDB; 