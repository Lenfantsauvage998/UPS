// src/routes/nodeRoutes.js
import { Router } from "express";
import {
  getAllNodes,
  getNode,
  createNewNode,
  editNode,
  removeNode
} from "../controllers/nodeController.js";
import { validateBody } from "../middleware/validateRequest.js";
import { nodeSchema } from "../middleware/schemas.js";

const router = Router();

/**
 * @swagger
 * /api/nodes:
 *   get:
 *     summary: Lista todos los nodos
 *     tags: [Nodes]
 *     responses:
 *       200:
 *         description: Array de nodos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Node'
 */
router.get("/", getAllNodes);

/**
 * @swagger
 * /api/nodes/{id}:
 *   get:
 *     summary: Obtiene un nodo por su ID
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del nodo a recuperar
 *     responses:
 *       200:
 *         description: Nodo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Node'
 *       404:
 *         description: No se encontró un nodo con ese ID
 */
router.get("/:id", getNode);

/**
 * @swagger
 * /api/nodes:
 *   post:
 *     summary: Crea un nuevo nodo
 *     tags: [Nodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NodeInput'
 *     responses:
 *       201:
 *         description: Nodo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Node'
 *       400:
 *         description: Error de validación de datos
 */
router.post(
  "/", 
  validateBody(nodeSchema),   // ← habilitamos validación Joi antes de Mongoose
  createNewNode
);

/**
 * @swagger
 * /api/nodes/{id}:
 *   put:
 *     summary: Actualiza un nodo existente
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del nodo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NodeInput'
 *     responses:
 *       200:
 *         description: Nodo actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Node'
 *       400:
 *         description: Error de validación de datos
 *       404:
 *         description: No se encontró un nodo con ese ID
 */
router.put(
  "/:id",
  validateBody(nodeSchema),
  editNode
);

/**
 * @swagger
 * /api/nodes/{id}:
 *   delete:
 *     summary: Elimina un nodo por su ID
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del nodo a eliminar
 *     responses:
 *       204:
 *         description: Eliminación exitosa (sin contenido)
 *       404:
 *         description: No se encontró un nodo con ese ID
 */
router.delete("/:id", removeNode);

export default router;
