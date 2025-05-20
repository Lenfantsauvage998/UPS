import mongoose from 'mongoose';

const edgeSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: [true, 'Nodo origen obligatorio']
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: [true, 'Nodo destino obligatorio']
  },
  weight: {
    type: Number,
    required: [true, 'El peso es obligatorio'],
    min: [0, 'El peso no puede ser negativo']
  }
}, {
  timestamps: true
});

export default mongoose.model('Edge', edgeSchema);
