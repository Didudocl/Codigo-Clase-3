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
    try {
        console.log("test")
        const userRepository = AppDataSource.getRepository(User)

        //find devuelve una promesa
        const usersFound = await userRepository.find();
        for(let i = 0; i < usersFound.length; i++) {
            usersFound[i].createdAt = formatToLocalTime(usersFound[i].createdAt);
            usersFound[i].updatedAt = formatToLocalTime(usersFound[i].updatedAt);
        }

        return usersFound;
    }catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}
export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.find(id)
        if(!user) {
            return null;
        }
        console.log("dataUser")
        console.log(dataUser)
        await userRepository.update(
            //where
            {
                id,
            },
            //set
            {
                    nombreCompleto : dataUser.nombreCompleto,
                    rut : dataUser.rut,
                    email: dataUser.email,
            }
        )
        //find devuelve una promesa
        return dataUser;
    }catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}
export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User)
        //no muestra en la documentacion valor de retorno
        userRepository.delete(id);
        //find devuelve una promesa
        return userSaved;
    }catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}