import { Router } from "express";
import { getAllNodes , getNode , createNewNode , editNode , removeNode   } from "../controllers/nodeController.js";
import { get } from "mongoose";
import { validateBody } from '../middleware/validateRequest.js';
import { nodeSchema }   from '../middleware/schemas.js';
import { createNewNode, editNode } from '../controllers/nodeController.js';

const router = Router();

router.get('/',getAllNodes);
router.get('/:id',getNode);
router.post('/',validateBody(nodeSchema) ,createNewNode);
router.put('/;id', validateBody(nodeSchema) ,editNode);
router.delete('/:id',removeNode)

export default router;

