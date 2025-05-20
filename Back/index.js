import { app1 , expressJson1 } from './app.js'
import { configDotenv } from 'dotenv';

configDotenv();

const app = app1

const expressJson = expressJson1

const PORT = process.env.PORT || 3000;

app.use(expressJson);

app.get('/', (req, res) => {
  res.json({ message: '✅ API funcionando solo mia :DDD' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});