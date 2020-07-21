import {mongoose} from 'mongoose';
import {Productos, Clientes} from '../bd';

module.exports = {
    Query:{
        getProducto: (root,{id})=>{
            return new Promise((resolve,reject)=>{
                Productos.findById({_id:id},(error,producto)=>{
                    if(error) reject(error);
                    else resolve(producto);
                });
            });
        },
        getProductos: (root,{limite,offset})=>{
            return Productos.find().limit(limite).skip(offset);
        },
        totalProductos: (root)=>{
            return new Promise((resolve,reject)=>{
                Productos.countDocuments({},(error,count)=>{
                    if(error) reject(error);
                    else resolve(count);
                });
            });
        }
    },
    Mutation:{
        nuevoProducto : (root,{input})=>{
            const nuevoProducto = new Productos({
                nombre : input.nombre,
                precio : input.precio,
                stock : input.stock
            });
            nuevoProducto.id = nuevoProducto._id;
            return new Promise((resolve,reject)=>{
                nuevoProducto.save((error)=>{
                    if(error) reject(error);
                    else resolve(nuevoProducto);
                });
            });
        },
        actualizarProducto : (root,{input})=>{
            return new Promise((resolve,reject)=>{
                Productos.findOneAndUpdate({_id:input.id},input,{new:true}, (error,producto)=>{
                    if(error) reject(error);
                    else resolve(producto);
                });
            });
        },
        eliminarProducto : (root,{id})=>{
            return new Promise((resolve,reject)=>{
                Productos.findOneAndDelete({_id:id},(error)=>{
                    if(error) reject(error);
                    else resolve("Se eliminó correctamente");
                });
            });
        }
    }
};