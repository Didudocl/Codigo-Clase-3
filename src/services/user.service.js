"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js'

export async function createUserService(dataUser) {
    try {
        //accedemos al repositorio de la entidad User
        const userRepository = AppDataSource.getRepository(User);

        // creamos un nuevo usuario
        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email
        });

        //guardamos el nuevo usuario
        const userSaved = await userRepository.save(newUser);

        return userSaved;
    } catch (error) {
        console.error('Error al crear un usuario: ', error);
    }
}

export async function getUserService() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        // Formateamos las fechas de creación y actualización de cada usuario
        users.forEach(user => {
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });

        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
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

export async function updateUserService(id, userData) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: {id}
        });

        if(!userFound) {
            return null;  // retornamos null en lugar de usar res
        }

        await userRepository.update(id, userData);
        
        const userUpdated = await userRepository.findOne({
            where: { id }
        });
        
        return userUpdated;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
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

        const userDeleted = await userRepository.remove(userFound);

        return userDeleted;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
}