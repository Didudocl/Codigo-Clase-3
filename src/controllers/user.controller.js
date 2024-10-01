"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { userBodyValidation } from '../validations/user.validation.js';
import { createUserService, getUserService, getUsersService, updateUserService, deleteUserService} from '../services/user.service.js';


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
    } catch (error) {
        console.error('Error al obtener un usuario, el error: ', error);
    }
}

export async function getUsers(req, res) { //? Obtener todos los usuarios registrados.
    try {
        const [users, error] = await getUsersService();

        if(error) {
            return res.status(404).json({
                message: error,
                data: null
            })
        }

        res.status(200).json({ message: "Usuarios encontrados", data: users })
    } catch (error) {
        console.error('Error al obtener los usuarios, el error: ', error);
    }
}

export async function updateUser(req, res) { //? Actualizar un usuario por su id.
    try {
        const id = req.params.id;

        const user = req.body;

        const { value, error } = userBodyValidation.validate(user);

        if (error) return res.status(400).json({ message: error.message });

        const [userUpdated, message] = await updateUserService(id, value);

        if (!userUpdated) return res.status(404).json({ message: "Usuario no encontrado", data: null });

        return res.status(200).json({ message: "Usuario actualizado correctamente", data: userUpdated });
    } catch (error) {
        console.error("Error al actualizar un usuario: ", error);
    }
}

export async function deleteUser(req, res) { //? Eliminar un usuario por su id.
    try {
        const userRepository = AppDataSource.getRepository(User);
        const { id } = req.params; // Obtener el id desde los parámetros de la solicitud

        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        await userRepository.remove(userFound);

        return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar un usuario: ", error);
        return res.status(500).json({ message: "Error al eliminar un usuario" });
    }
}