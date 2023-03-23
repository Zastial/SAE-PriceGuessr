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

export const joiProduct = Joi.object({
    id: Joi.number().description("id of the product"),
    title: Joi.string().description("title of the product"),
    price: Joi.number().description("price of the product in euros"),
    imgSrc: Joi.string().description("image source of the product")
})