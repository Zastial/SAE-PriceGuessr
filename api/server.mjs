'use strict'
import Hapi from '@hapi/hapi'
import Joi from 'joi'
import HapiSwagger from 'hapi-swagger'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'

const routes = [

]

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

server.route(routes)

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
        }
    ])
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});