"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
import { formatToLocalTime } from '../utils/formatDate.js'

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        if (!users || users.length === 0) {
            return null;
        }

        users.forEach(user => {
            user.createdAt = formatToLocalTime(user.createdAt);
            user.updatedAt = formatToLocalTime(user.updatedAt);
        });

        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
    }
}