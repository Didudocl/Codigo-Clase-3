"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        // Buscar el usuario a eliminar
        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        // Eliminar el usuario
        const deletedUser = await userRepository.remove(userFound);

        return deletedUser;
    } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
    }
}
