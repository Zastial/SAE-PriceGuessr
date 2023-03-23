'use strict'
import Hapi from '@hapi/hapi'
import Joi from 'joi'
import HapiSwagger from 'hapi-swagger'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import * as dotenv from 'dotenv'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import { userController } from './controller/userController.mjs'

// valide function for authentification
const validate = async function (decoded, request, h) {
    const user = userController.findByLogin(decoded.login)
    if (user == null || !user.isPasswordValid(decoded.pass)) {
        return {isValid: false, credentials: null}
    }
    return {isValid: true, credentials: user.login}
}

const routes = [
    {
        method: '*',
        path: '/{any*}',
        config: {auth: false},
        handler: (request, h) => {
            return h.response({message: 'not found'}).code(400)
        }
    },

    {
        method: 'GET',
        path: '/test',
        config: {auth: 'jwt'},
        handler: (request, h) => {
            return h.response({message: 'bien joué'}).code(200)
        }
    }
]

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

const swaggerOptions = {
    info: {
        title: "API Produits",
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