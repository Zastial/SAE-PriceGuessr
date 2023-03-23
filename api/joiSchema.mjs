import Joi from "joi";

export const joiUser = Joi.object({
    login: Joi.string().required().description("login of the user"),
    password: Joi.string().required().description("password of the user")
})

export const joiUserRegistered = Joi.object({
    login: Joi.string().required().description("login of the user"),
    password: Joi.string().required().description("password of the user hashed")
})

export const joiJWT = Joi.object({
    token: Joi.string().description("generated JWT token valid for 24 hours")
})

export const joiErrorMessage = Joi.object({
    message: Joi.string().description("error")
})