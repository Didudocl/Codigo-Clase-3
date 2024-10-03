// ----- LOGICA DE NEGOCIOS -----

"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { idValidation, userBodyValidation } from '../validations/user.validation.js';
import { createUserService, getUserService, updateUserService } from '../services/user.service.js';


export async function createUser(req, res) {
    try {
        const user = req.body;

        //validamos el body del request
        const { value, error } = userBodyValidation.validate(user); 

        // si hay un error en la validación, retornamos un mensaje de error
        if(error) return res.status(400).json({
            message: error.message
        })

        const userSaved = await createUserService(value);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: userSaved
        })
    } catch (error) {
        console.error("Error al crear un usuario, el error es: ", error);
    }
}

export async function getUser(req, res) {
    try {

        //validamos el id pasado por parámetro del request
        const id = req.params.id;
        const { error: idError } = idValidation.validate({ id });

        // si hay un error en la validación del id, retornamos un mensaje de error
        if(idError) return res.status(400).json({
            message: idError.message
        })

        const userFound = await getUserService(id);

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
        const users = await getUserService();

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

export async function updateUser(req, res) {
    try {
        //validamos el id pasado por parámetro del request
        const id = req.params.id;
        const { error: idError } = idValidation.validate({ id });

        // si hay un error en la validación del id, retornamos un mensaje de error
        if(idError) return res.status(400).json({
            message: idError.message
        })

        //validamos el body del request
        const user = req.body;
        const { value, error_body } = userBodyValidation.validate(user);
        
        // si hay un error en la validación del body, retornamos un mensaje de error
        if(error_body) return res.status(400).json({
            message: error_body.message
        })
        
        // actualizamos el usuario a través del servicio updateUserService
        const userUpdated = await updateUserService(id, value);

        // Si el usuario no es encontrado, retornamos un error 404
        if (!userUpdated) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: userUpdated
        })

    } catch (error) {
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export async function deleteUser(req, res) {
    try {

        //validamos el id pasado por parámetro del request
        const id = req.params.id;
        const { error: idError } = idValidation.validate({ id });

        // si hay un error en la validación del id, retornamos un mensaje de error
        if(idError) return res.status(400).json({
            message: idError.message
        })

        const userDeleted = await deleteUserService(id);

        if(!userDeleted) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario eliminado correctamente",
            data: userDeleted
        })
    } catch (error) {
        console.error("Error al eliminar un usuario: ", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}