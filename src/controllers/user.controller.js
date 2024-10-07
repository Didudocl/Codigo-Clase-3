"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { userBodyValidation } from '../validations/user.validation.js';
import { createUserService, getUserService } from '../services/user.service.js';
import updateUserService from '../services/updateUserService';

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

export async function getUsers(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

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
        const { id } = req.params;
        const { nombre, apellido, rut, email } = req.body;

        // Validación de campos
        if (!nombre || !apellido || !rut || !email) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Validación de RUT (usando la expresión regular corregida)
        const rutRegex = /^([1-2](?:\d\.\d{3}){2}-[\dkK]|[1-9](?:\d\.\d{3}){2}-[\dkK])$/;
        if (!rutRegex.test(rut)) {
            return res.status(400).json({ error: 'Formato de RUT inválido' });
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Formato de email inválido' });
        }

        const updatedUser = await updateUserService(id, { nombre, apellido, rut, email });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const id = req.params.id;

        const userFound = await userRepository.findOne({
            where: {id}
        });

        if(!userFound) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        const userDeleted = await userRepository.remove(userFound);

        res.status(200).json({
            message: "Usuario eliminado correctamente",
            data: userDeleted
        })
    } catch (error) {
        console.error("Error al eliminar un usuario: ", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}