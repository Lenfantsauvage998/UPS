import app from './app.js'
import { configDotenv } from 'dotenv';
import { connectDB } from "./database/mongoose.js";

connectDB();

configDotenv();

const app1 = app

const PORT = process.env.PORT || 3000;

app1.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentacion con Swagger UI corriendo en  http://localhost:${PORT}/api-docs`)
});