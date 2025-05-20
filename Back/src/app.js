import express from "express";
// import { connectDB } from "./database/mongoose.js";
import nodeRoutes from './routes/nodeRoutes.js';
import edgeRoutes from './routes/edgeRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

const app1 = express();

app1.use(express.json());

app1.use('/api/nodes', nodeRoutes);
app1.use('/api/edges', edgeRoutes);
app1.use('/api/route', routeRoutes);

// app1.use(errorHandler)

export default app1


