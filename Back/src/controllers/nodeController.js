import { fectchAllNodes,fetchNodeById,createNode, updateNode , deleteNode  } from "../services/nodeService.js";

export const getAllNodes = async (req , res , next) => {
    try{
        const nodes = await fectchAllNodes();
        res.json(nodes);
    } catch (err) {
        next(err);
    }
}

export const getNode = async (req , res ,next) =>{
    try{
        const node = await fetchNodeById(req.params.id);
        if (!node) return res.status(404).json({ message: 'Node no encontrado' });
        res.json(node);
    }catch(err){
        next(err);
    }

}

export const createNewNode = async (req, res, next) => {
  try {
    const newNode = await createNode(req.body);
    res.status(201).json(newNode);
  } catch (err) {
    next(err);
  }
};

export const editNode = async (req, res, next) => {
  try {
    const updated = await updateNode(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Node no encontrado' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const removeNode = async (req, res, next) => {
  try {
    await deleteNode(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};