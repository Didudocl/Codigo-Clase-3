'use strict'
import User from '../entity/user.entity.js'
import { AppDataSource } from '../config/configDb.js'
import { userBodyValidation } from '../validations/user.validation.js'
import {
    createUserService,
    deleteUserService,
    getUserService,
    updateUserService,
} from '../services/user.service.js'

export async function createUser(req, res) {
    try {
        const user = req.body

        const { value, error } = userBodyValidation.validate(user)

        if (error)
            return res.status(400).json({
                message: error.message,
            })

        const userSaved = await createUserService(value)

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: userSaved,
        })
    } catch (error) {
        console.error('Error al crear un usuario, el error es: ', error)
    }
}

export async function getUser(req, res) {
    try {
        const id = req.params.id

        const userFound = await getUserService(id)

        if (!userFound) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                data: null,
            })
        }

        res.status(200).json({
            message: 'Usuario encontrado',
            data: userFound,
        })
    } catch (error) {
        console.error('Error al obtener un usuario, el error: ', error)
    }
}

export async function getUsers(req, res) {
    try {
        const users = await getUserService()

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron usuarios',
                data: null,
            })
        }

        res.status(200).json({
            message: 'Usuarios encontrados',
            data: users,
        })
    } catch (error) {
        console.error('Error al obtener un usuarios, el error: ', error)
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id
        const user = req.body

        const { value, error } = userBodyValidation.validate(user)

        if (error)
            return res.status(400).json({
                message: error.message,
            })

        const updatedUser = await updateUserService(id, value)

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            data: updatedUser,
        })
    } catch (error) {
        console.error('Error al actualizar un usuario: ', error)
        res.status(500).json({ message: 'Error interno en el servidor' })
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id

        const userDeleted = await deleteUserService(id)

        res.status(200).json({
            message: 'Usuario eliminado correctamente',
            data: userDeleted,
        })
    } catch (error) {
        console.error('Error al eliminar un usuario: ', error)
        res.status(500).json({ message: 'Error interno en el servidor' })
    }
}
