const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;
const winston = require('winston');

module.exports = [

    {

        method: 'POST',
        path: '/admin/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                return Controller.Admin.Login(request.payload, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().lowercase().trim().required(),
                    password: Joi.string().trim().required()
                }),
                headers: UniversalFunctions.authorizationHeaderObjOptional,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'Get',
        path: '/admin/getUsersList',
        config: {
            description: 'getUsersList',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
            tags: ['api', 'getUsersList'],
            handler: (request, reply) => {
                return Controller.Admin.userList(request.query, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },

            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },

            plugins: {
                'hapi-swagger': {

                    payloadType: 'form'

                }
            }
        }
    },

    {
        method: 'POST',
        path: '/admin/blockUser',
        config: {
            description: 'blockUser',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                return Controller.Admin.blockUser(request.payload, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },

            validate: {
                payload: Joi.object({
                    userId: Joi.string()
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },

            plugins: {
                'hapi-swagger': {

                    payloadType: 'form'

                }
            }
        }
    },

    {
        method: 'Get',
        path: '/admin/getEvents',
        config: {
            description: 'getEvents',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                return Controller.Admin.getEvents(request.query, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },

            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },

            plugins: {
                'hapi-swagger': {

                    payloadType: 'form'

                }
            }
        }
    },

    {
        method: 'Get',
        path: '/admin/upComingEvents',
        config: {
            description: 'upComingEvents',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                return Controller.Admin.upComingEvents(request.query, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },

            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },

            plugins: {
                'hapi-swagger': {

                    payloadType: 'form'

                }
            }
        }
    },

    {
        method: 'Get',
        path: '/admin/pastEvents',
        config: {
            description: 'pastEvents',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.ADMIN] },
            tags: ['api', 'admin'],
            handler: (request, reply) => {
                return Controller.Admin.pastEvents(request.query, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },

            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },

            plugins: {
                'hapi-swagger': {

                    payloadType: 'form'

                }
            }
        }
    },


]