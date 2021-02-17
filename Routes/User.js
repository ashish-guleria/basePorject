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
        path: '/user/singup',
        config: {
            description: 'singup',
            auth: false,
            tags: ['api', 'singup'],
            handler: (request, reply) => {
                //console.log("err")
                return Controller.User.SignUp(request.payload)
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
                    fullName: Joi.string().trim().required(),
                    gender: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.MALE,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.FEMALE
                    ),
                    dob: Joi.string().required(),
                    phoneNumber: Joi.string(),
                    password: Joi.string()
                    
                    
                    
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

    {
        method: 'POST',
        path: '/user/login',
        config: {
            description: 'login',
            auth: false,
            tags: ['api', 'user'],
            handler: (request, reply) => {

                return Controller.User.Login(request.payload, request.auth.credentials)
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
        method: 'POST',
        path: '/user/verifyDevice',
        config: {
            description: 'verifyDevice',
            auth: false,
            tags: ['api', 'verifyDevice'],
            handler: (request, reply) => {

                return Controller.User.verifyUser(request.payload, request.auth.credentials)
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
                    userId:Joi.string().required(),
                    otp: Joi.number().required(),
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
        method: 'GET',
        path: '/user/changePassword',
        config: {
            description: 'changePassword',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                
                return Controller.User.changePassword(request.query, request.auth.credentials)
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
                    oldPassword:Joi.string(),
                    newPassword:Joi.string()
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
        path: '/user/editProfile',
        config: {
            description: 'editProfile',
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.USER]
            },
            tags: ['api', 'user'],
            handler: (request, reply)=> {
                
                return Controller.User.editProfile(request.payload, request.auth.credentials)
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
                    name:Joi.string(),
                    
                    gender: Joi.string().valid(
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.MALE,
                        Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.FEMALE
                    ),
                    dob:Joi.string(),
                    bio:Joi.string()

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
        path: '/user/uploadImage',
        config: {
            description: 'uploadImage',
            auth: { strategies: [Config.APP_CONSTANTS.SCOPE.USER] },
            tags: ['api', 'images'],
            handler: (request, reply) => {
                return Controller.User.uploadImages(request.payload, request.auth.credentials)

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


]