"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function updateUserService(id, data) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        let user = await userRepository.findOne({ where: { id } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);

        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar el usuario: ', error);
    }
}
