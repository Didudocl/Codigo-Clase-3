"use strict";
import Joi from 'joi';

const domainEmailValidator = (value, helper) => {
    if(!value.endsWith("@gmail.com")) {
        return helper.message(
            "El email debe ser del dominio @gmail.com"
        )
    }
    return value;
}

export const userBodyValidation = Joi.object({
    nombreCompleto: Joi.string()
        .min(3)
        .max(45)
        .pattern(new RegExp("^[a-zA-Z\\s]+$"))
        .required()
        .messages({
            "string.empty": "El nombre completo no puede estar vacío.",
            "any.required": "El nombre completo es obligatorio.",
            "string.base": "El nombre completo debe ser de tipo string.",
            "string.min": "El nombre completo debe tener como mínimo 3 caracteres.",
            "string.max": "El nombre completo debe tener como máximo 30 caracteres.",
            "string.pattern.base": "El nombre completo permite solo letras de la a-z."
        }),
    rut: Joi.string()
        .pattern(/^([1-2]\d|[1-9])(\.\d{3}){2}-[\dkK]$|^([1-2]\d{6}|[1-9]\d{5}|[1-9]\d{4}|[1-9]\d{3}|[1-9]\d{2}|[1-9]\d|[1-9])-[\dkK]$/)
        .required()
        .messages({
            "string.empty": "El rut no puede estar vacío.",
            "any.required": "El rut es obligatorio",
            "string.base": "El rut debe ser de tipo string.",
            "string.pattern.base": "El rut debe ser válido y en el formato xx.xxx.xxx-x o xxxxxxxx-x, con un máximo de 29.999.999-9"
        }),
    email: Joi.string()
        .min(15)
        .max(45)
        .required()
        .email()
        .messages({
            "string.empty": "El email no puede estar vacío.",
            "any.required": "El email es obligatorio",
            "string.base": "El email debe tener formato con dominio apropiado.",
            "string.min": "El email debe tener como mínimo 15 caracteres.",
            "string.max": "El email debe tener como máximo 30 caracteres",
        })
        .custom(domainEmailValidator, "Validación dominio email"),
});
