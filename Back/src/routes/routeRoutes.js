/**
 * @swagger
 * tags:
 *   - name: Routes
 *     description: Endpoints de conectividad y ruta óptima
 *
 * components:
 *   schemas:
 *     Connectivity:
 *       type: object
 *       properties:
 *         connected:
 *           type: boolean
 *           description: Indica si el grafo es completamente conexo
 *           example: true
 *
 *     ShortestPath:
 *       type: object
 *       properties:
 *         path:
 *           type: array
 *           description: Listado de IDs de nodos que forman la ruta óptima
 *           items:
 *             type: string
 *           example: ['60f7c2b4a2e4f81234567891','60f7c2b4a2e4f81234567892']
 *         distance:
 *           type: number
 *           nullable: true
 *           description: Distancia total de la ruta. Null si no hay ruta válida
 *           example: 12.5
 */

import { Router } from 'express';
import { checkConnectivity, getShortestPath } from '../controllers/routeController.js';

const router = Router();

/**
 * @swagger
 * /api/route/connectivity:
 *   get:
 *     summary: Verifica la conectividad del grafo
 *     tags: [Routes]
 *     description: Comprueba si desde algún nodo se puede alcanzar a todos los demás nodos en el grafo.
 *     responses:
 *       200:
 *         description: Resultado de la verificación de conectividad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Connectivity'
 */
router.get('/connectivity', checkConnectivity);

/**
 * @swagger
 * /api/route/shortest:
 *   get:
 *     summary: Calcula la ruta más corta entre dos nodos
 *     tags: [Routes]
 *     description: Retorna el camino óptimo y su distancia entre los nodos de inicio y fin proporcionados.
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del nodo de inicio
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del nodo de destino
 *     responses:
 *       200:
 *         description: Objeto con la ruta y la distancia calculadas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortestPath'
 *       400:
 *         description: Parámetros 'start' o 'end' faltantes o inválidos
 */
router.get('/shortest', getShortestPath);

export default router;
