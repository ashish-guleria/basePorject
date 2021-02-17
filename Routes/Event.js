const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;
const winston = require('winston');
const otp = require('../Libs/otp');
const { array } = require('@hapi/joi');



module.exports = [
    {
        method: 'POST',
        path: '/event/create',
        config: {
            description: 'create',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', 'create'],
            handler: (request, reply) => {
                //console.log("err")
                return Controller.Event.createEvent(request.payload, request.auth.credentials)
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

                    eventName: Joi.string(),
                    venue: Joi.object({
                        name: Joi.string(),
                        longitude: Joi.number(),
                        latitude:Joi.number()
                    }),

                    startingTime: Joi.date(),
                    endingTime: Joi.date(),
                    description: Joi.string().required(),
                    gestLimit: Joi.string(),
                    category: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.POOL,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.KARAOKE,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.BIRTHDAY,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.DRINKING,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.MUSIC,
                    ),

                    hostingEventAs: Joi.string(),
                    partyImage: Joi.array().items(Joi.string()),

                }),
                headers: UniversalFunctions.authorizationHeaderObj,

                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    //  payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'get',
        path: '/event/getEvent',
        config: {
            description: 'getEvent',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', 'create'],
            handler: (request, reply) => {
                //console.log("err")
                return Controller.Event.viewParty(request.query, request.auth.credentials)
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
        path: '/event/image',
        config: {
            description: 'image',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', 'images'],
            handler: (request, reply) => {
                return Controller.Event.images(request.payload, request.auth.credentials)

                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },

            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 200000000 * 1000 * 1000
            },

            validate: {

                payload: Joi.object({
                    partyId: Joi.string(),
                    file: Joi.any().meta({ swaggerType: 'file' }).optional().description('Image File')

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

    // {
    //     method: 'POST',
    //     path: '/event/images',
    //     config: {
    //         description: 'images',
    //         auth: false,
    //         tags: ['api', 'images'],
    //         handler: (request, reply) => {
    //             console.log("request")
    //             return Controller.Event.images(request.payload, request.auth.credentials)

    //                 .then(response => {
    //                     return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
    //                 })
    //                 .catch(error => {
    //                     winston.error("=====error=============", error);
    //                     return UniversalFunctions.sendError("en", error, reply);
    //                 });
    //         },

    //         payload: {
    //             output: "stream",
    //             parse: true,
    //             allow: "multipart/form-data",
    //             maxBytes: 200000000 * 1000 * 1000
    //         },

    //         validate: {

    //             payload: Joi.object({


    //                 // venue: Joi.object({
    //                 //     name: Joi.string(),
    //                 //     coordinates: Joi.array().items(Joi.number())
    //                 // }),

    //                 file:Joi.array().items(Joi.any().meta({ swaggerType: 'file' }).optional().description('Image File'))

    //             }),
    //             // headers: UniversalFunctions.authorizationHeaderObj,

    //             failAction: UniversalFunctions.failActionFunction
    //         },


    //         plugins: {
    //             'hapi-swagger': {
    //                 payloadType: 'form'
    //             }
    //         }
    //     }
    // },

]