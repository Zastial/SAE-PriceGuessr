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
    jwt: Joi.string().allow("").required().description('jwt token of the user')
})

export const joiJWT = Joi.object({
    token: Joi.string().description("generated JWT token valid for 24 hours")
})

export const joiErrorMessage = Joi.object({
    message: Joi.string().description("error")
})

export const joiProduct = Joi.object({
    id: Joi.string().required().description("id of the product"),
    date: Joi.date().required().format('YYYY-MM-DD').description('date of when the product has been added'),
    title: Joi.string().required().description("title of the product"),
    price: Joi.number().required().description("price of the product in euros"),
    imgSrc: Joi.string().required().description("image source of the product"),
    desc: Joi.string().required().description("description of the product")
})

export const joiProductArray = Joi.array().items(joiProduct).description("Array of stored products")

export const joiGuessAnswer = Joi.object({
    guessRemaining: Joi.number().required().description("number of guesses remaining"),
    correct: Joi.boolean().required().description("true if the user guessed right"),
    correctPriceIsLess: Joi.boolean().required().description("true if the correct price is less than user guess")
})

export const joiAvailability = Joi.object({
    buCode: Joi.string().required().description("id of the store"),
    stock: Joi.number().required().description("number of a product in the store"),
    name: Joi.string().required().description("name of the store"),
    longitude: Joi.number().required().description("longitude of the store"),
    latitude: Joi.number().required().description("latitude of the store")
})

export const joiAvailabilityArray = Joi.array().items(joiAvailability).description("Array of availabilities")

export const joiDailyGuesses = Joi.object({
    productId: Joi.string().required().description("id of the product"),
    guessRemaining: Joi.number().required().description("number of guesses remaining")
})
export const joiDailyGuessesArray = Joi.array().items(joiDailyGuesses).description('Array of guesses of daily products. Can be empty.')