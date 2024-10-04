"use strict";
import { userBodyValidation } from '../validations/user.validation.js';
import { createUserService, getUserService, getUsersService, updateUserService, deleteUserService } from '../services/user.service.js';

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
        res.status(500).json({ message: "Error interno en el servidor" });
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
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export async function getUsers(req, res) {
    try {
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
    } catch (error) {
        console.error('Error al obtener usuarios, el error: ', error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const userData = req.body;

        // Validación del cuerpo de la solicitud
        const { value, error } = userBodyValidation.validate(userData);

        if(error) return res.status(400).json({
            message: error.message
        })

        const updatedUser = await updateUserService(id, value);

        if(!updatedUser) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: updatedUser
        })
    } catch (error) {
        console.error("Error al actualizar un usuario: ", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id;

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
