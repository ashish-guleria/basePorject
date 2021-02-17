const User = require('./User');
const Event=require('./Event');
const Admin=require('./Admin')






const all = [].concat(
     
     User,
     Event,
     Admin
);
module.exports = all;

