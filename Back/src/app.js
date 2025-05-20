import express from "express";
import cors from 'cors';
// import { connectDB } from "./database/mongoose.js";
import nodeRoutes from './routes/nodeRoutes.js';
import edgeRoutes from './routes/edgeRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app1 = express();

// 2) Habilita CORS para todo origen (o configúralo como necesites)
app1.use(cors({
  origin: '*' ,            // permite cualquier origen
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UPS Navigation API',
      version: '1.0.0',
      description: 'API para gestión de nodos y cálculo de rutas óptimas'
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Servidor local' }
    ]
  },
  apis: ['./src/routes/*.js']  // aquí Swagger lee tus comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Documentación Swagger
app1.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app1.use(errorHandler)
app1.use(express.json());

app1.use('/api/nodes', nodeRoutes);
app1.use('/api/edges', edgeRoutes);
app1.use('/api/route', routeRoutes);

// app1.use(errorHandler)

export default app1


