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

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if (!users) {
            return null;
        }
        users.forEach(user => {
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });
        return users;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}

export async function updateUserService(id, usuario) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.update(id, usuario);

    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}

export async function deleteUserService(usuario) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const eliminado = await userRepository.remove(usuario);
        return eliminado;

    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}