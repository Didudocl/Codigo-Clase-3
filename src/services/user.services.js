"use strict";

import User from'../entity/user.entity.js';
import { AppDataSource } from '../config/configDB.js';
import { formatToLocalTIme } from '../utils/formatDate.js';

export async function createUserService(dataUser) {
    try {
        const userRepository=AppDataSource.getRepository(User);

        const newUser =userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email

        })
        const userSaved =await userRepository.save(newUser);
        return userSaved;

    } catch (error) {
        console.log("Error al crear un usuario ", error);
        
    }
    
}

export async function getUserServices(id) {
    try {
        const userRepository= AppDataSource.getRepository(User);
        const userFound= await userRepository.findOne({
            where: {id:id}

        })
        if(!userFound){
            return null;
        }
        userFound.createdAt=formatToLocalTIme(userFound.createdAt)
        userFound.createdAt=formatToLocalTIme(userFound.updatedAt)
        
        return userFound

    } catch (error) {
        console.log("Error al obtener el usuario ", error);
    }
    
}


export async function getUsersServices() {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if(!users || users.length === 0) {
        return null;
        }
        return users;
}

export async function updateUserServices(id, user) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null; 
        }

        const updatedUser = await userRepository.save({ ...userFound, ...user });

        return updatedUser;

    } catch (error) {
        console.log("Error al actualizar el usuario: ", error);
        throw new Error("Error en el servidor");
    }
}

export async function deleteUserService(id) {

    const userRepository=AppDataSource.getRepository(User);
    const userFound= await userRepository.findOne({
            where:[{
                id:id
            }]
        });
        if(!userFound){
            return null;
            };
        
        const userDeleted= await userRepository.remove(userFound);
        return userDeleted;

}
