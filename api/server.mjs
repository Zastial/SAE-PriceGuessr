'use strict'
import Hapi from '@hapi/hapi'
import Joi from 'joi'
import HapiSwagger from 'hapi-swagger'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import { userController } from './controller/userController.mjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { joiJWT, joiUser, joiUserRegistered } from './joiSchema.mjs'
dotenv.config()

const ONE_DAY = 24*60*60

// valide function for authentification
const validate = async function (decoded, request, h) {
    const user = await userController.findByLogin(decoded.login)
    if (user == null) {
        return {isValid: false, credentials: null}
    }
    return {isValid: true, credentials: user.login}
}

const routes = [
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
            
            // token expires after one day
            const expiration = Math.floor(new Date().getTime()/1000) + ONE_DAY
            const token = jwt.sign({login: user.login, exp: expiration}, process.env.JWT_SECRET_KEY)
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
                    201: joiUserRegistered,
                    409: Joi.object({message: "user already exists"})
                }
            }
        },
        handler: async (request, h) => {
            const user = await userController.save(request.payload)
            if (!user) {
                return h.response({message: "user already exists"}).code(409)
            }
            return h.response(user).code(201)
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
                    201: joiUserRegistered,
                    400: Joi.any()
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
        handler: async (request, h) => {
            try {
                
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