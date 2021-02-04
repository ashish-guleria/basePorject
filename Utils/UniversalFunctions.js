/**
 * Created by Shumi on 17/5/18.
 */



const Boom = require('@hapi/boom'),
    Joi = require('@hapi/joi'),
    winston = require('winston'),
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    SUCCESS = Config.responseMessages.SUCCESS;


function sendError(language,data,reply) {
    console.log("-----------------error------------------", data);
    let error;
    let logError;
    if (typeof data == 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
        let finalMessage = data.customMessage.en;
        if(language && language == "ar") finalMessage = data.customMessage.ar;
        error =  new Boom.Boom( finalMessage,{statusCode :data.statusCode} );
        if(data.hasOwnProperty('type')) {
            error.output.payload.type = data.type;
            winston.error(error);
            return error;
        }
    }
    else {
        let errorToSend = '',
            type = '';

        if (typeof data == 'object') {
            if (data.name == 'MongoError') {

                if(language && language == "ar") errorToSend += ERROR.DB_ERROR.customMessage.ar;
                else errorToSend += ERROR.DB_ERROR.customMessage.en;

                type = ERROR.DB_ERROR.type;
                if (data.code = 11000) {

                    if(language && language == "ar") errorToSend += ERROR.DUPLICATE.customMessage.ar;
                    else errorToSend += ERROR.DUPLICATE.customMessage.en;

                    type = ERROR.DUPLICATE.type;
                }
            } else if (data.name == 'ApplicationError') {

                if(language && language == "ar") errorToSend += ERROR.APP_ERROR.customMessage.ar;
                else errorToSend += ERROR.APP_ERROR.customMessage.en;

                type = ERROR.APP_ERROR.type;
            } else if (data.name == 'ValidationError') {

                if(language && language == "ar") errorToSend += ERROR.APP_ERROR.customMessage.ar + data.message;
                else errorToSend += ERROR.APP_ERROR.customMessage.en + data.message;

                type = ERROR.APP_ERROR.type;
            } else if (data.name == 'CastError') {

                if(language && language == "ar") errorToSend += ERROR.DB_ERROR.customMessage.ar + ERROR.INVALID_OBJECT_ID.customMessage.ar;
                else errorToSend += ERROR.DB_ERROR.customMessage.en + ERROR.INVALID_OBJECT_ID.customMessage.en;

                type = ERROR.INVALID_OBJECT_ID.type;
            } else if(data.response) {
                errorToSend = data.response.message;
            }
            else{
                errorToSend = data
                errorToSend = "Something went wrong, please try again. If the problem persist please contact administrator";
                logError = data;
            }
        } else {
            errorToSend = data;
            type = ERROR.DEFAULT.type;
        }
        let customErrorMessage = errorToSend;
        if (typeof errorToSend == 'string'){
            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            } else {
                customErrorMessage = errorToSend;
            }
            customErrorMessage = customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage.replace('[', '');
            customErrorMessage = customErrorMessage.replace(']', '');
        }
        error =  new Boom.Boom(customErrorMessage,{statusCode :400});
        error.output.payload.type = type;
        error.loggingMessage = logError;
        winston.error(error);
        return error;
    }
};

function sendSuccess(language,successMsg, data,reply) {
    successMsg = successMsg || SUCCESS.DEFAULT.customMessage.en;
    
    if (typeof successMsg == 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')){

        let finalMessage = successMsg.customMessage.en;
        if(language && language == "ar") finalMessage = successMsg.customMessage.ar;

        return {statusCode:successMsg.statusCode, message: finalMessage, data: data || {}};
    }
    else return {statusCode:200, message: successMsg, data: data || {}};
};

function failActionFunction(request, reply, error) {
    
    
    console.log("==============request===================",request.payload,request.query, error)

    error.output.payload.type = "Joi Error";

    if (error.isBoom) {
        delete error.output.payload.validation;
        if (error.output.payload.message.indexOf("authorization") !== -1) {
            error.output.statusCode = ERROR.UNAUTHORIZED.statusCode;
            return reply(error);
        }
        let details = error.details[0];
        if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
            error.output.payload.message = "Invalid " + details.path;
            return reply(error);
        }
    }
    let customErrorMessage = '';
    if (error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage.replace(/\b./g, (a) => a.toUpperCase());
    delete error.output.payload.validation;
    return error;
};

var authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required()
}).unknown();

var authorizationHeaderObjOptional = Joi.object({
    authorization: Joi.string()
}).unknown();


module.exports = {
    failActionFunction : failActionFunction,
    authorizationHeaderObj:authorizationHeaderObj,
    sendSuccess : sendSuccess,
    sendError : sendError,
};