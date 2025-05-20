import { Router } from 'express';
import {
  getAllEdges,
  createNewEdge,
  editEdge,
  removeEdge
} from '../controllers/edgeController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Edges
 *   description: Operaciones CRUD sobre aristas
 *
 * components:
 *   schemas:
 *     Edge:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único de la arista
 *           example: '60f7c2b4a2e4f81234567890'
 *         from:
 *           type: string
 *           description: ID del nodo origen
 *           example: '60f7c2b4a2e4f81234567891'
 *         to:
 *           type: string
 *           description: ID del nodo destino
 *           example: '60f7c2b4a2e4f81234567892'
 *         weight:
 *           type: number
 *           description: Peso o costo de la arista
 *           example: 5.2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última modificación
 *
 *     EdgeInput:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - weight
 *       properties:
 *         from:
 *           type: string
 *           description: ID del nodo origen
 *         to:
 *           type: string
 *           description: ID del nodo destino
 *         weight:
 *           type: number
 *           description: Peso o costo de la arista
 */

/**
 * @swagger
 * /api/edges:
 *   get:
 *     summary: Obtiene todas las aristas
 *     tags: [Edges]
 *     responses:
 *       200:
 *         description: Array de aristas existentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Edge'
 */
router.get('/', getAllEdges);

/**
 * @swagger
 * /api/edges:
 *   post:
 *     summary: Crea una nueva arista
 *     tags: [Edges]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EdgeInput'
 *     responses:
 *       201:
 *         description: Arista creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Edge'
 *       400:
 *         description: Error de validación de datos
 */
router.post('/', createNewEdge);

/**
 * @swagger
 * /api/edges/{id}:
 *   put:
 *     summary: Actualiza una arista existente
 *     tags: [Edges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la arista a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EdgeInput'
 *     responses:
 *       200:
 *         description: Arista actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Edge'
 *       400:
 *         description: Error de validación de datos
 *       404:
 *         description: No se encontró la arista con el ID proporcionado
 */
router.put('/:id', editEdge);

/**
 * @swagger
 * /api/edges/{id}:
 *   delete:
 *     summary: Elimina una arista por su ID
 *     tags: [Edges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la arista a eliminar
 *     responses:
 *       204:
 *         description: Eliminación exitosa (sin contenido)
 *       404:
 *         description: No se encontró la arista con el ID proporcionado
 */
router.delete('/:id', removeEdge);


export default router;
