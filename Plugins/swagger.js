/**
 * Created by Shumi on 17/5/18.
 */

'use strict';
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

exports.plugin = {
    name: 'swagger-plugin',

    register: async (server) => {
        const swaggerOptions = {
            info: {
                title: 'On Toes API Doc'

            },
        };
        let swagger = [
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ];
        
        
        await server.register(
            swagger
        );
        // winston.info('Swagger Loaded');
    }
};
