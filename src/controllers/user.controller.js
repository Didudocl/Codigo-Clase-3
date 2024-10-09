"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { userBodyValidation } from '../validations/user.validation.js';
import { 
    createUserService, getUserService, getUsersService, updateUserService,
    deleteUserService
} from '../services/user.service.js';



export async function createUser(req, res) {
    try {
        const user = req.body;

        const { value, error } = userBodyValidation.validate(user);

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

        const id = req.params.id;

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
        console.log(userFound)
    } catch (error) {
        console.error('Error al obtener un usuario, el error: ', error);
    }
}

export async function getUsers(req, res) {
    try {
        //const userRepository = AppDataSource.getRepository(User);
        //const users = await userRepository.find();
        const users = await getUsersService();

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
        console.log(users)
    } catch (error) {
        console.error('Error al obtener un usuarios, el error: ', error);
    }
}

export async function updateUser(req, res) {
    try {
        //const userRepository = AppDataSource.getRepository(User);

        const id = req.params.id;
        const user = req.body;

        const {value, error} = userBodyValidation.validate(user);
        const userFound = await updateUserService(id, user);
        //const userFound = await userRepository.findOne({
            //where: {id}
        //});

        if(!userFound) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: userFound
        })
    } catch (error) {
        console.error("Error al actualizar un usuario: ", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        let userDeleted = deleteUserService(id)
        if(userDeleted === null) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }
        return res.status(200).json({
            message: "Usuario eliminado correctamente",
            data: userDeleted
        })

    } catch (error) {
        console.error("Error al eliminar un usuario: ", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}

//Tarea 3
/*
    - [X] getUsersService
    - [X] updateUserService
    - [X] deleteUserService

    - [X] validacion updateUser
    - [X] expresion regular rut

*/
