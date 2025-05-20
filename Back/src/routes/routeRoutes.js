import { Router } from 'express';
import { checkConnectivity, getShortestPath } from '../controllers/routeController.js';

const router = Router();

router.get('/connectivity', checkConnectivity);   // /api/route/connectivity
router.get('/shortest', getShortestPath);         // /api/route/shortest?start=…&end=…

export default router;
