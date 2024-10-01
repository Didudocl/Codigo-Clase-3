'use strict';
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js';

export async function createUserService(dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email,
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
            where: { id: id },
        });

        if (!userFound) {
            return null;
        }

        userFound.createdAt = formatToLocalTime(userFound.createdAt);
        userFound.updatedAt = formatToLocalTime(userFound.updatedAt);

        return userFound;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if (!users || users.length === 0) return [null, 'No hay usuarios'];

        return users;
    } catch (error) {
        console.error('Error al obtener a los usuarios:', error);
    }
}

export async function updateUserService(query, body) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id: query.id },
        });

        if (!userFound) return [null, 'Usuario no encontrado'];

        userRepository.merge(userFound, body);

        const userUpdated = await userRepository.save(userFound);

        return [userUpdated, null];
    } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id: id },
        });

        if (!userFound) return [null, 'Usuario no encontrado'];

        await userRepository.remove(userFound);

        return [userFound, null];
    } catch (error) {
        console.error('Error al eliminar un usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}