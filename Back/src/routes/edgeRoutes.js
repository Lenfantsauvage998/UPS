import { Router } from 'express';
import {
  getAllEdges,
  createNewEdge,
  editEdge,
  removeEdge
} from '../controllers/edgeController.js';

const router = Router();

router.get('/', getAllEdges);
router.post('/', createNewEdge);
router.put('/:id', editEdge);
router.delete('/:id', removeEdge);

export default router;
