"use stric"
import User from '../entity/user.entity.js';
import {AppDataSource} from '../config/configDB.js';
import { userBodyValidation } from '../validation/user.validation.js';
import { createUserService, deleteUserService, getUserServices,getUsersServices,updateUserServices } from '../services/user.services.js';

export async function createUser(req,res) {
    try {

        const userRepositoy = AppDataSource.getRepository(User);
        const user = req.body;
        const {value,error}=userBodyValidation.validate(user);
        
        if(error)return res.status(400).json({
            message: error.message
        })

        const userSaved= await createUserService(value);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            data:userSaved

        })
    } catch (error) {
        console.error("error al crear el usuario", error);
    }
}

export async function getUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const id = req.params.id;
        const userFound=  await getUserServices(id);

        if(!userFound) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            })
        }

        res.status(200).json({
            message: "Usuario encontrado",
            data: userFound
        })
    } catch (error) {
        console.error('Error al obtener un usuario, el error: ', error);
    }
}

export async function getUsers(req, res) {
    try {
        const users = await getUsersServices()

        if(!users || users.length === 0) {
            return res.status(404).json({
                message: "No se encontraron usuarios",
                data: null
            })
        }

        res.status(200).json({
            message: "Usuarios encontrados",
            data: users
        })
    } catch (error) {
        console.error('Error al obtener un usuarios, el error: ', error);
    }
}

// Actualizar usuario
export async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const user = req.body;

        const userUpdated = await updateUserServices(id, user);

        if (!userUpdated) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        return res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: userUpdated
        });

    } catch (error) {
        console.log("Error al actualizar el usuario:", error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}


//eliminar usurio
export async function deleteUser(req,res) {
    try {
  
        const id= req.params.id
        const userDeleted= await deleteUserService(id)
        if(!userDeleted){
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message:"Usuario borrado correctamente",
            data: userDeleted
        })

    } catch (error) {
        console.log("Error para eliminar el usuario:",error);
        res.status(500).json({message: "Error interno del servidor"});
    }
    
}
