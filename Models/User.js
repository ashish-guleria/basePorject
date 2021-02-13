const { string, boolean } = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');

var User = new Schema({

    fullName: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true },

    gender: {
        type: String,
        enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.MALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.FEMALE
        ], require: true

    },

    dob: { type: String },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
    bio: { type: String },
    imgUrl: [{ type: String }],
    otp: { type: Number },
    verifyId: { type: String },
    isVerify: { type: Boolean, default: false },
    isBlock: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', User);