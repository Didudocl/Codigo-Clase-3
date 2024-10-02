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
        const users = await userRepository.find();
        
        users.forEach(user => {
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });
        console.log("usuarios encontrados", users);

        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw new Error("Error al obtener los usuarios");
    }
      
}

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        
        users.forEach(user => {
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });
        console.log("usuarios encontrados", users);

        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}

export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userToUpdate = await userRepository.findOne({ where: { id } });

        if (!userToUpdate) {
            return null;
        }

        userRepository.merge(userToUpdate, dataUser);
        const updatedUser = await userRepository.save(userToUpdate);

        updatedUser.createdAt = formatToLocalTime(updatedUser.createdAt);
        updatedUser.updatedAt = formatToLocalTime(updatedUser.updatedAt);

        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
    }
}


export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);
   
        const userToDelete = await userRepository.findOne({
            where: { id }
        });
    
        if (!userToDelete) {
            return null;
        }
    
        await userRepository.remove(userToDelete);
    
        return userToDelete;
    } catch (error) {
        console.error('Error al eliminar un usuario: ', error);
        throw error;
    }
}
