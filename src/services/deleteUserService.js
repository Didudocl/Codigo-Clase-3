"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await userRepository.remove(user);

        return user;
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
    }
}
