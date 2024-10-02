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

export async function updateUserService(user,id){
    try {

        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: {id : id}
        });

        userFound.nombreCompleto=user.nombreCompleto;
        userFound.rut= user.rut;
        userFound.email= user.email;

        userRepository.save(userFound);

        if(!userFound) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        return userFound;
    } catch (error) {
        console.error("Error al encontrar el usuario:",error)
        
    }


}

export async function deleteUserService(id,res) {
    try {
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
        where: {id}
    });

    res.status(200).json({
        message: "Usuario eliminado correctamente",
        data: userFound
    })


    if(!userFound) {
        return res.status(404).json({
            message: "Usuario no encontrado",
            data: null
        });
    }

    await userRepository.remove(userFound)
    
    } catch (error) {
        console.error("Error al eliminar un usuario: ", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
    
}