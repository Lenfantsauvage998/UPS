import Node from '../models/Node.js'

// Obtener todos los nodos
export const fectchAllNodes = ()=>
    Node.find().lean();

// Obtener un nodo por ID
export const fetchNodeById = (id) =>
  Node.findById(id).lean();

// Crear un nuevo nodo 
export const createNode = ({name1 ,latitude,longitude}) => {
   const node = new Node({ name1, latitude, longitude });
    return node.save();
}

export const updateNode = (id, data) =>
  Node.findByIdAndUpdate(id, data, { new: true, runValidators: true });


export const deleteNode = (id) =>
  Node.findByIdAndDelete(id);