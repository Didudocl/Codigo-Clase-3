'use strict'
import User from '../entity/user.entity.js'
import { AppDataSource } from '../config/configDb.js'
import { formatToLocalTime } from '../utils/formatDate.js'

export async function createUserService(dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User)

        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email,
        })

        const userSaved = await userRepository.save(newUser)

        return userSaved
    } catch (error) {
        console.error('Error al crear un usuario: ', error)
    }
}

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User)

        const users = await userRepository.find()

        return users
    } catch (error) {
        console.error('Error al obtener los usuarios: ', error)
    }
}

export async function getUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User)

        const userFound = await userRepository.findOne({
            where: { id },
        })

        if (!userFound) {
            return null
        }

        userFound.createdAt = formatToLocalTime(userFound.createdAt)
        userFound.updatedAt = formatToLocalTime(userFound.updatedAt)

        return userFound
    } catch (error) {
        console.error('Error al obtener el usuario:', error)
    }
}

export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User)

        const userFound = await userRepository.findOne({
            where: { id: id },
        })

        if (!userFound) {
            return null
        }

        const userUpdated = await userRepository.update(id, dataUser)

        return userUpdated
    } catch (error) {
        console.error('Error al actualizar el usuario:', error)
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User)

        const userFound = await userRepository.findOne({
            where: { id: id },
        })

        if (!userFound) {
            return null
        }

        const userDeleted = await userRepository.remove(userFound)

        return userDeleted
    } catch (error) {
        console.error('Error al eliminar el usuario:', error)
    }
}
