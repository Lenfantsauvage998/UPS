import {
  fecthAllEdges,
  createEdge,
  updateEdge,
  deleteEdge
} from '../services/edgeService.js';

export const getAllEdges = async (req, res, next) => {
  try {
    const edges = await fecthAllEdges();
    res.json(edges);
  } catch (err) {
    next(err);
  }
};

export const createNewEdge = async (req, res, next) => {
  try {
    const edge = await createEdge(req.body);
    res.status(201).json(edge);
  } catch (err) {
    next(err);
  }
};

export const editEdge = async (req, res, next) => {
  try {
    const updated = await updateEdge(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Edge no encontrado' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const removeEdge = async (req, res, next) => {
  try {
    await deleteEdge(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
