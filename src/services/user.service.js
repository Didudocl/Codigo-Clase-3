"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js';

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

        if (!users || users.length === 0) {
            return null;  
        }

        return users.map(user => ({
            ...user,
            createdAt: formatToLocalTime(user.createdAt),
            updatedAt: formatToLocalTime(user.updatedAt),
        }));
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
        throw error;  
    }
}

export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;  
        }

        await userRepository.update(id, {
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email,
            updatedAt: new Date()  
        });

        const updatedUser = await userRepository.findOne({
            where: { id }
        });

        return updatedUser ? {
            ...updatedUser,
            createdAt: formatToLocalTime(updatedUser.createdAt),
            updatedAt: formatToLocalTime(updatedUser.updatedAt),
        } : null;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw error;
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        const deletedUser = await userRepository.remove(userFound);

        return deletedUser;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
    }
}
