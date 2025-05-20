import Edge from '../models/Edge.js';

// Listar todas las aristas 
export const fecthAllEdges = () => 
    Edge.find().populate('from to').lean();

// Crear arista 
export const createEdge = ({from,to,weight}) => {
    const edge = new Edge({from,to,weight})
    return edge.save();
}

// Actualizar peso 

export const updateEdge = (id,data) => 
    Edge.findByIdAndUpdate(id, data, { new: true, runValidators: true });

// Eliminar arista
export const deleteEdge = (id) =>
  Edge.findByIdAndDelete(id);