import BaseJoi from "joi";
import JoiDate from '@joi/date'

const Joi = BaseJoi.extend(JoiDate)

export const joiUser = Joi.object({
    login: Joi.string().required().description("login of the user"),
    password: Joi.string().required().description("password of the user")
})

export const joiUserWithToken = Joi.object({
    login: Joi.string().required().description("login of the user"),
    password: Joi.string().required().description("password of the user"),
    jwt: Joi.string().required().description('jwt token of the user')
})

export const joiJWT = Joi.object({
    token: Joi.string().description("generated JWT token valid for 24 hours")
})

export const joiErrorMessage = Joi.object({
    message: Joi.string().description("error")
})

export const joiProduct = Joi.object({
    id: Joi.number().description("id of the product"),
    date: Joi.date().format('YYY-MM-DD').description('date of when the product has been added'),
    title: Joi.string().description("title of the product"),
    price: Joi.number().description("price of the product in euros"),
    imgSrc: Joi.string().description("image source of the product")
})

export const joiProductArray = Joi.array().items(joiProduct).description("Array of stored products")