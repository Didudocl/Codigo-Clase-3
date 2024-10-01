"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js'

export async function createUserService(dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email
        });

        const userSaved = await userRepository.save(newUser);

        return userSaved;
    } catch (error) {
        console.error('Error al crear un usuario: ', error);
    }
}

export async function getUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        userFound.createdAt = formatToLocalTime(userFound.createdAt);
        userFound.updatedAt = formatToLocalTime(userFound.updatedAt);

        return userFound;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}

export async function getUsersService() { //? Obtener todos los usuarios registrados.
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if (!users) return [null, "No hay usuarios registrados"];

        users.forEach(user => { //? Formatear las fechas de creación y actualización. ForEach para recorrer cada elemento de un array.
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });

        return [users, null];
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
    }
}

export async function updateUserService(query, body) { //? Actualizar un usuario por su id.
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where: { id: query } });

        if (!userFound) return [null, "Usuario no encontrado"];

        userRepository.merge(userFound, body); //? Unir los datos del usuario encontrado con los datos del cuerpo de la solicitud.

        const userUpdated = await userRepository.save(userFound);

        return [userUpdated, null];
    } catch (error) {
        console.error("Error al actualizar un usuario: ", error);
    }
}

export async function deleteUserService(id) { //? Eliminar un usuario por su id.
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) return [null, "El usuario no existe"];

        await userRepository.remove(userFound);

        return [true, null];
    } catch (error) {
        console.error("Error al eliminar un usuario: ", error);
    }
}