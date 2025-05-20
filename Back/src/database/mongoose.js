import mongoose from 'mongoose';
import {MONGODB_URI} from "../config/index.js";

export function connectDB(){
    if(!MONGODB_URI) {
        console.error('❌ No se ha definido MONGODB_URI en .env');
        process.exit(1);
    }
    mongoose.connect(MONGODB_URI).then(()=> console.log('✅ Conectado a MongoDB'))
    .catch(err =>{
        console.error('❌ Error al conectar a MongoDB:', err);
        process.exit(1);
    })
}