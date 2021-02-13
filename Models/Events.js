const { string } = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');

var Event = new Schema({
    eventName:{type:String},
    venue: { name: { type: String }, coordinates: [Number] },
    
    price: { type: Number },
    startingTime: { type : Date },
    endingTime: { type : Date },
    description: { type: String },
    guestLimit: { type: Number },
    Category: {
        type: String,
        emum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.POOL,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.KARAOKE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.BIRTHDAY,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.DRINKING,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.MUSIC,
        ], default: Config.APP_CONSTANTS.DATABASE_CONSTANT.PARTY_TYPE.POOL
    },
    hostingEventAs: { type: String },
    partyImage: [{ type: String }],
    userId:{ type: Schema.ObjectId, ref: 'User' },
    rating: [{
        userId: { type: Schema.ObjectId, ref: 'User' },
        rate: { type: Number, require: true },
        description: { type: String }
    }],
    reportEvent: [{
        userId: { type: Schema.ObjectId, ref: 'User' },
        description: { type: String }
    }],
    hostId: { type: Schema.ObjectId, ref: 'User' },
    request: {
        pending: [{ type: Schema.ObjectId, ref: 'User' }],

        accepted: [{ type: Schema.ObjectId, ref: 'User' }],

        rejected: [{ type: Schema.ObjectId, ref: 'User' }],

        userPressNah:[{type:Schema.ObjectId, ref:'User'}]
    },

})

module.exports = mongoose.model('Event', Event);