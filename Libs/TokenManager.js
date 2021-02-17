/**
 * Created by Shumi on 18/5/18.
 */

const Jwt = require('jsonwebtoken'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models'),
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    _ = require('lodash')
ERROR = Config.responseMessages.ERROR;

var GenerateToken = (tokenData, userType) => {
    return new Promise((resolve, reject) => {
        try {

            let secretKey;
            switch (userType) {
                case Config.APP_CONSTANTS.SCOPE.USER:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER;
                    break;

                case Config.APP_CONSTANTS.SCOPE.ADMIN:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_ADMIN;
                    break;

                case Config.APP_CONSTANTS.SCOPE.BRANCH:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_BRANCH;
                    break;
                case Config.APP_CONSTANTS.SCOPE.CAPTAIN:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_CAPTAIN;
                    break;

                default:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_ADMIN;
            }

            let token = Jwt.sign(tokenData, secretKey);

            return resolve(token);
        } catch (err) {
            return reject(err);
        }
    });
};


var verifyToken = async (tokenData) => {
    
    var user;
    if (tokenData.scope === Config.APP_CONSTANTS.SCOPE.ADMIN) {
        user = await DAO.getData(Models.Admin, { _id: tokenData._id }, { _id: 1 }, { lean: true });
    }

    else if (tokenData.scope === Config.APP_CONSTANTS.SCOPE.BRANCH) {
        user = await DAO.getData(Models.User, { _id: tokenData._id, isBlocked: false }, { _id: 1 }, { lean: true });
    }

    else if (tokenData.scope === Config.APP_CONSTANTS.SCOPE.USER)
        user = await DAO.getData(Models.User, { _id: tokenData._id }, { __v: 0 }, { lean: true });

    else if (tokenData.scope === Config.APP_CONSTANTS.SCOPE.CAPTAIN)
        user = await DAO.getData(Models.User, { _id: tokenData._id, isBlocked: false }, { __v: 0 }, { lean: true });

    else {
        console.log("============No User Found==============");
        throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
    }
   
    if (user.length === 0) throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);

    else if (user && user[0]) {
        user[0].scope = tokenData.scope;
        return {
            isValid: true,
            credentials: user[0]
        };
    }
    else throw UniversalFunctions.sendError("en", ERROR.UNAUTHORIZED);

};

module.exports = {
    GenerateToken,
    verifyToken
};