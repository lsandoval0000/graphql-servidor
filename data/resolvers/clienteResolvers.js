import { Clientes } from "../bd";
import {mongoose} from 'mongoose';

module.exports = {
    Query:{
        getCliente : (root,{id})=>{
            return new Promise( (resolve,reject)=>{
                Clientes.findById({_id:id}, (error,cliente)=>{
                    if(error) reject(error);
                    else resolve(cliente);
                } )
            });
        },
        getClientes: (root,{limite,offset})=>{
            return Clientes.find().limit(limite).skip(offset);
        },
        totalClientes: (root)=>{
            return new Promise((resolve,reject)=>{
                Clientes.countDocuments({},(error,count)=>{
                    if(error) reject(error);
                    else resolve(count);
                });
            });
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
                Clientes.findOneAndUpdate({_id : input.id}, input, {new:true}, (error,cliente)=>{
                    if(error) reject(error);
                    else resolve(cliente);
                });
            });
        },
        eliminarCliente:(root,{id})=>{
            return new Promise((resolve,reject)=>{
                Clientes.findOneAndRemove({_id:id},(error)=>{
                    if(error) reject(error);
                    else resolve("Se eliminó correctamente ");
                });
            });
        }
    }
}