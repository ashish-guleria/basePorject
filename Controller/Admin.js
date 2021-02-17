const { admin } = require('googleapis/build/src/apis/admin');
const { models } = require('mongoose');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    request = require("request");


const Login = async (payload) => {

    try {
        const { email, password } = payload;

        const query = {
            email
        };

        const result = await DAO.getDataOne(Models.Admin, query);
        if (result === null) throw ERROR.INVALID_CREDENTIALS;
        const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string

        if (!checkPassword) throw ERROR.INVALID_CREDENTIALS;

        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.ADMIN,
            _id: result._id,
            time: new Date(),
            // exp:Math.floor(Date.now() / 1000) + 1800
        };

        const accessToken = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.ADMIN);

        return {
            accessToken
        }

    }
    catch (err) {
        throw err
    }
}


const userList = async (payload) => {
    const result = DAO.getData(Models.User, {}, {})
    return result



}


module.exports = {
    Login,
    userList
}