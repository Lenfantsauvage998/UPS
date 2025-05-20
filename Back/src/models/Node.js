import mongoose, { mongo } from "mongoose";

const nodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    latitude: {
        type:Number,
        required: [true, 'La latitud es obligatoria'],
        min: [-90, 'La latitud mínima es -90'],
        max: [90,  'La latitud máxima es 90']
    },
    longitude: {
    type: Number,
    required: [true, 'La longitud es obligatoria'],
    min: [-180, 'La longitud mínima es -180'],
    max: [180,  'La longitud máxima es 180']
  }
}, {
  timestamps: true
}
)

export default mongoose.model('Node',nodeSchema)