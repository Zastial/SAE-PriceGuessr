'use strict'
import Hapi from '@hapi/hapi'
import BaseJoi from 'joi'
import HapiSwagger from 'hapi-swagger'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import { userController } from './controller/userController.mjs'
import * as dotenv from 'dotenv'
import { joiErrorMessage, joiJWT, joiProduct, joiProductArray, joiUser, joiUserWithToken } from './joiSchema.mjs'
import { productController } from './controller/productController.mjs'
import JoiDate from '@joi/date'

dotenv.config()
const Joi = BaseJoi.extend(JoiDate)

// valide function for authentification
const validate = async function (decoded, request, h) {
    const user = await userController.findByLogin(decoded.login)

    if (user == null || request.headers.authorization != user.jwt) {
        return {isValid: false, credentials: null}
    }
    return {isValid: true, credentials: user.login}
}

const routes = [
    {
        method: 'GET',
        path: '/restricted',
        handler: (request, h) => {
            const response = h.response({text: 'You used a Token!'});
            response.header("Authorization", request.headers.authorization);
            return response;
        }
    },
    {
        method: '*',
        path: '/{any*}',
        options: {auth: false},
        handler: (request, h) => {
            return h.response({message: 'not found'}).code(400)
        }
    },

    {
        method: 'POST',
        path: '/user/auth',
        options: {
            auth: false,
            description: 'Authentificate',
            notes: 'Authentificate user with login and password',
            tags: ['api'],
            validate: {
                payload: joiUser
            },
            response: {
                status: {
                    201: joiJWT,
                    400: Joi.object({message: 'authentification failed'})
                }
            }
        },
        handler: async (request, h) => {
            const {login, password} = request.payload;
            const user = await userController.findByLogin(login);
            const validUser = user && (user.isPasswordValid(password))

            if (!validUser) {
                return h.response({message: 'authentification failed'}).code(400)
            }
            
            let token = await userController.findAndValidateJwt(login)
            return h.response({token}).code(200)
        }
    },

    {
        method: 'POST',
        path: '/user/register',
        options: {
            auth: false,
            description: 'Register new user',
            notes: 'Register a new user with login and password',
            tags: ['api'],
            validate: {
                payload: joiUser
            },
            response: {
                status: {
                    201: joiUserWithToken.description('user registered'),
                    409: Joi.object({message: "user already exists"}),
                    400: joiErrorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const user = await userController.save(request.payload)
                if (!user) {
                    return h.response({message: "user already exists"}).code(409)
                }
                return h.response(user).code(201)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'DELETE',
        path: '/user',
        options: {
            description: 'Delete user',
            notes: 'Delete user currently logged in with JWT in Authorization Header',
            tags: ['api'],
            response: {
                status: {
                    200: joiUserWithToken,
                    400: joiErrorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const login = request.auth.credentials.login
                const deletedUser = await userController.delete(login)
                return h.response(deletedUser).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'PUT',
        path: '/user',
        options: {
            description: 'Modify user',
            notes: 'modify user password currently logged in with jwt from Authorization header',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().required().description('new password of the user')
                })
            },
            response: {
                status: {
                    200: joiUserWithToken.description('modified user'),
                    400: joiErrorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const login = request.auth.credentials.login
                const user = {login: login, password: request.payload.password}
                const updatedUser = await userController.updatePassword(user)
                return h.response(updatedUser).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'GET',
        path: '/product',
        options: {
            auth: false,
            description: 'Get products',
            notes: 'Get all stored products',
            tags: ['api'],
            response: {
                status: {
                    200: joiProductArray,
                    400: joiErrorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const products = await productController.findAll()
                return h.response(products).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'GET',
        path: '/product/{productId}',
        options: {
            auth: false,
            description: 'Get product',
            notes: 'Get product with a specific id',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    productId: Joi.number().required().description("id of the product")
                })
            },
            response: {
                status: {
                    200: joiProduct,
                    400: joiErrorMessage,
                    404: Joi.object({
                        message: "product not found"
                    })
                }
            }
        },
        handler: async (request, h) => {
            try {
                const product = await productController.findById(request.params.productId)
                if (!product) {
                    return h.response({message: "product not found"}).code(404)
                }
                return h.response(product).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'GET',
        path: '/product/daily',
        options: {
            auth: false,
            description: 'Get daily products',
            notes: 'Get products which have been added today',
            tags: ['api'],
            response: {
                status: {
                    200: joiProductArray,
                    400: joiErrorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const recentProducts = await productController.findDailyProducts()
                return h.response(recentProducts).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'GET',
        path: '/product/daily/{date}',
        options: {
            auth: false,
            description: 'Get products by date',
            notes: 'Get products which have been added on a specific date',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    date: Joi.date()
                    .format('YYYY-MM-DD')
                    .required().description("date of when the products have been added, YYY-MM-DD format")
                })
            },
            response: {
                status: {
                    200: joiProductArray,
                    400: joiErrorMessage,
                }
            }
        },
        handler: async (request, h) => {
            try {
                const products = await productController.findByDate(request.params.date)
                return h.response(products).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    },

    {
        method: 'GET',
        path: '/product/{productId}/{priceGuess}',
        options: {
            description: 'Guess the price',
            notes: 'Guess the price of the product with id productId, using priceGuess and the user stored with the jwt in Authorization Header',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    productId: Joi.number().required().description("id of the product"),
                    priceGuess: Joi.number().required().description("guess of the price")
                })
            },
            response: {
                status: {
                    400: joiErrorMessage
                }
            }
        },
        handler: async (request, h) => {
            try {
                const productId = request.params.productId
                const login = request.auth.credentials.login
                const price = request.params.priceGuess
                const answer = await productController.guessPrice(productId, login, price)
                return h.response(answer).code(200)
            } catch (e) {
                return h.response(e).code(400)
            }
        }
    }

   
]

const server = Hapi.server({
    port: 3000,
    host: '127.0.0.1'
})

const swaggerOptions = {
    info: {
        title: "API App SAE Groupe 1",
        version: '1.0.0',
    }
};

export const init = async () => {
    await server.initialize()
    return server
}

export const start = async () => {
    await server.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        hapiAuthJwt2
    ])

    server.auth.strategy('jwt', 'jwt',
        { key: process.env.JWT_SECRET_KEY, 
        validate
    })
    server.auth.default('jwt')

    server.route(routes)

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});