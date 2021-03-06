const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    otp = require('../Libs/otp'),
    upload = require('../Libs/uploadManager')


const SignUp = async (payload) => {

    let query = {
        email: payload.email,
    };
    let result = await DAO.getData(Models.User, query, { _id: 1 }, { limit: 1 });

    if (result.length) {
        throw ERROR.EMAIL_ALREADY_EXIST;
    }

    payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
    var newOtp = await otp.otp()

    let saveData = {
        email: payload.email,
        fullName: payload.fullName,
        gender: payload.gender,
        dob: payload.dob,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        otp: newOtp
    }
    result = await DAO.saveData(Models.User, saveData);

    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: result._id,
        time: new Date(),
    };
    const accessToken = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);
    return {
        accessToken,
        user: {
            ...result
        }
    }
}

const verifyUser = async (payload) => {

    const { otp, userId } = payload

    let result = await DAO.getData(Models.User, userId, {}, {});
    // console.log(result[0].otp)
    if (otp === result[0].otp) {
        var verify = {
            isVerify: true
        }
    } else {
        verify = {

            isVerify: false
        }
    }

    const data = await DAO.findAndUpdate(Models.User, { _id: result[0]._id }, verify, { new: true });

}

const Login = async (payload) => {

    try {
        const { email, password } = payload;

        const query = {
            email,
        };
        const result = await DAO.getDataOne(Models.User, query, {});

        if (result === null) throw ERROR.INVALID_CREDENTIALS;
        const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string
        if (!checkPassword) throw ERROR.INVALID_CREDENTIALS;

        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.USER,
            _id: result._id,
            time: new Date(),
            // exp:Math.floor(Date.now() / 1000) + 1800
        };

        const accessToken = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);

        return {
            accessToken,
            user: {
                _id: result._id,

            }
        }

    }
    catch (err) {
        throw err
    }
}

const changePassword = async (payload, userDetail) => {
    var { oldPassword, newPassword } = payload

    var checkPassword = Bcrypt.compareSync(oldPassword, userDetail.password);
    if (!checkPassword) throw ERROR.INVALID_CREDENTIALS

    newPassword = Bcrypt.hashSync(newPassword, Config.APP_CONSTANTS.SERVER.SALT);
    console.log(userDetail._id, newPassword)

    const result = await DAO.findAndUpdate(Models.User, { _id: userDetail._id }, { password: newPassword }, {})

    return (result)

}

const editProfile = async (payload, userDetail) => {
    query = {
        name: payload.name,
        gender: payload.gender,
        dob: payload.dob,
        bio: payload.bio
    }

    let result = await DAO.findAndUpdate(Models.User, { _id: userDetail._id }, query)


    console.log(payload, "---------------------------------------", userDetail)

    return result
}

const uploadImages = async (payload, userDetail) => {


    let imgDetail = await upload.upload(payload)
    var imgName = [];
    const query = {
        _id: userDetail._id
    }

    for (var i = 0; i < imgDetail.length; i++) {
        imgName.push(imgDetail[i].filename)

    }
    //console.log(query)
    console.log(imgName)

    let result = await DAO.update(Models.User, query, { $push: { images: imgName } }, {})

    //console.log(userDetail)

    //console.log("--------------------------",request.payload)

    return result

}


module.exports = {
    SignUp,
    Login,
    verifyUser,
    changePassword,
    editProfile,
    uploadImages
}