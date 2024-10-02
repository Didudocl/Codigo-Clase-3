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

export const getUsersService = async () => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
};

export const updateUserService = async (id, dataUser) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({ where: { id } });
        if (!userFound) {
            throw new Error('Usuario no encontrado');
        }
        await userRepository.update(id, dataUser);
        const updatedUser = await userRepository.findOne({ where: { id } });
        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
    }
};

export const deleteUserService = async (id) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({ where: { id } });
        if (!userFound) {
            throw new Error('Usuario no encontrado');
        }
        const deletedUser = await userRepository.remove(userFound);
        return deletedUser;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
};