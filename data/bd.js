import mongoose, { mongo } from 'mongoose';

mongoose.connect('mongodb://admin:1234@localhost:27017/',{useNewUrlParser:true,useUnifiedTopology: true,dbName :'clientes'})
.catch(error => handleError(error));

mongoose.set('useFindAndModify',false);

// Schemas para Mongo
const clientesSchema = new mongoose.Schema({
    nombre : String,
    apellido : String,
    empresa: String,
    emails : Array,
    edad: Number,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes',clientesSchema);

const productosSchema = new mongoose.Schema({
    nombre : String,
    precio : Number,
    stock : Number
});

const Productos = mongoose.model('productos',productosSchema);

// Errores

mongoose.connection.on('error', error => {
    handleError(error);
});

const handleError = (error)=>{
    console.log(error);
}

export {Clientes, Productos};