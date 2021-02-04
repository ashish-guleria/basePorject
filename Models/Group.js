const { string } = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');

var Group = new Schema({
   
groupName:{type:String,required:true},
groupParticipants:{type:Number,required:true},
groupCreaterId:{type:Schema.ObjectId,ref:"user"},

})

module.exports = mongoose.model('Group', Group);