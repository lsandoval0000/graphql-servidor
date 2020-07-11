import mongoose, { mongo } from 'mongoose';

mongoose.connect('mongodb://admin:1234@localhost:27017/',{useNewUrlParser:true,useUnifiedTopology: true,dbName :'clientes'})
.catch(error => handleError(error));

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

const handleError = (error)=>{
    console.log(error);
}

mongoose.connection.on('error', error => {
    handleError(error);
});

export {Clientes};