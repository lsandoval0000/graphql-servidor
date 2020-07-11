import {mongoose} from 'mongoose';
import {Clientes} from './bd';

export const resolvers = {
    Query:{
        getCliente : (root,{id})=>{
            return new Promise( (resolve,reject)=>{
                Clientes.findById({_id:id}, (error,cliente)=>{
                    if(error) reject(error);
                    else resolve(cliente);
                } )
            });
        },
        getClientes: (root,{limite})=>{
            return Clientes.find().limit(limite);
        }
    },
    Mutation:{
        crearCliente:(root,{input}) =>{
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos
            });
            nuevoCliente.id = nuevoCliente._id;
            return new Promise((resolve,reject)=>{
                nuevoCliente.save((error)=>{
                    if(error) reject(error);
                    else resolve(nuevoCliente);
                });
            });
        },
        actualizarCliente:(root,{input})=>{ 
            return new Promise((resolve,reject)=>{
                Clientes.findOneAndUpdate({_id : input.id}, input, {new:true,useFindAndModify:false}, (error,cliente)=>{
                    if(error) reject(error);
                    else resolve(cliente);
                });
            });
        },
        eliminarCliente:(root,{id})=>{
            return new Promise((resolve,reject)=>{
                Clientes.findOneAndRemove({_id:id},{useFindAndModify:false},(error)=>{
                    if(error) reject(error);
                    else resolve("Se eliminó correctamente ");
                });
            });
        }
    }
}