// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import nodeRoutes from './routes/nodeRoutes.js';
import edgeRoutes from './routes/edgeRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// 1) Servir front estático desde /public
app.use(express.static(path.join(__dirname, '../public')));

// 2) Middlewares globales
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// 3) Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UPS Navigation API',
      version: '1.0.0',
      description: 'Documentación de la API de navegación'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' }
    ]
  },
  apis: ['./src/routes/*.js']
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4) Rutas de la API
app.use('/api/nodes', nodeRoutes);
app.use('/api/edges', edgeRoutes);
app.use('/api/route', routeRoutes);

// 5) Manejador central de errores
app.use(errorHandler);

// 6) Fallback para rutas no-API (SPA)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
