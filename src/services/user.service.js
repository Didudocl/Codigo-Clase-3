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
    try{
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        if(!users || users.length === 0) {
            return null;
        }

        users.forEach(user => {
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });
        return users;
    }catch (error){
        console.error("Error al obtener los usuarios: ", error);
    }
}

export async function updateUserService(id, userData) {
    
    try{
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({ where: { id } });
        if (!userFound) {
            return null;
        }
        console.log("Usuario encontrado: ", userFound); // Log para verificar si se encuentra el usuario
        await userRepository.update(id, userData);
        console.log("Datos actualizados: ", userData); // Log para verificar los nuevos datos

        const updatedUser = await userRepository.findOne({ where: { id } });
        console.log("Usuario actualizado: ", updatedUser); // Log para verificar el usuario actualizado
        return updatedUser;
    }catch(error){
        console.error("Error al actualizar el usuario: ", error);
        throw new Error("Error actualizando el usuario");
    }
    
}


export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null;
        }

        const userDeleted = await userRepository.remove(userFound);

        return userDeleted;
    } catch (error) {
        console.error("Error al eliminar un usuario:", error);
        throw error;
    }
}
