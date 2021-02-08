const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;
const winston = require('winston');
const otp = require('../Libs/otp')

module.exports = [

    {
        method: 'POST',
        path: '/event/create',
        config: {
            description: 'create',
            auth: false,
            tags: ['api', 'create'],
            handler: (request, reply) => {
                //console.log("err")
                return Controller.Event.createEvent(request.payload)
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
                    venue: Joi.string(),
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
                    partyImages: Joi.array().items(Joi.string()),
                }),

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

