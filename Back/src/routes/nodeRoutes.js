import { Router } from "express";
import { getAllNodes , getNode , createNewNode , editNode , removeNode   } from "../controllers/nodeController.js";
import { get } from "mongoose";

const router = Router();

router.get('/',getAllNodes);
router.get('/:id',getNode);
router.post('/',createNewNode);
router.put('/',editNode);
router.delete('/:id',removeNode)

export default router;

