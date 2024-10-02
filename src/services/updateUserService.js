"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        // Actualizar los campos del usuario encontrado
        await userRepository.update(id, {
            nombreCompleto: dataUser.nombreCompleto || userFound.nombreCompleto,
            rut: dataUser.rut || userFound.rut,
            email: dataUser.email || userFound.email,
            updatedAt: new Date()
        });

        // Buscar el usuario actualizado
        const updatedUser = await userRepository.findOne({
            where: { id }
        });

        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario: ", error);
    }
}
