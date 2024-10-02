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

export async function updateUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);
    
        const userFound = await userRepository.findOne({
            where:[{
                id:id
            }]
        });
        if (!userFound) {
            return null;
            }

            await userRepository.update(id, userData);

            const updatedUser = await userRepository.findOne({
                where: { id: id }
            });

        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario: ",error);
        res.status(500).json({message:"Error interno del servidor" });
    }
        
    }
export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id: id }
        });
        if (!userFound) {
            return null; 
        }
        await userRepository.remove(userFound);

        return userFound;
    } catch (error) {
        
    }
    
}
