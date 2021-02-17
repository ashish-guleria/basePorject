'use strict';

let mongoose = require('mongoose'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models'),
    bcrypt = require('bcryptjs'),
    winston = require('winston');

mongoose.Promise = Promise;
const util = require('util');
const fs = require('fs');

//Connect to MongoDB
mongoose.connect(Config[process.env.NODE_ENV].mongoDb.URI, { useNewUrlParser: true }).then(success => {
    winston.info('MongoDB Connected');
    Run();
}).catch(err => {
    console.log("====================", err)
    winston.info({ ERROR: err });
    process.exit(1);
});



const Run = async () => {

    /*-------------------------------------------------------------------------------
     * add admin
     * -----------------------------------------------------------------------------*/
    
    let password = "$2a$11$pE0.MuSdZNgTPVrLfaQvCeNqlyL4ztCqzNYF1JWWECthtujmB4ZBe";

    let adminDetails = {
        name: "Party king Admin",
        email: "admin@test.com",
        password: password,           //qwerty
    };
    let adminDetails1 = {
        name: "",
        email: "",
        password: password,           //qwerty
    };
    let adminDetails2 = {
        name: "",
        email: "",
        password: password,           //qwerty
    };

    CreateAdmin(adminDetails);
    //CreateAdmin(adminDetails1);
    //CreateAdmin(adminDetails2);

}

const CreateAdmin = async (adminDetails) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("===================================================================");
            
            let adminData = DAO.findAndUpdate(Models.Admin, { email: adminDetails.email }, adminDetails, { lean: true, upsert: true, new: true });

            return resolve("Admin Added");
        } catch (err) {

            console.log("**********************************************************************", err)
            return reject(err);
        }
    });
}


function checkFolderAlreadyExist() {

    let _dirPath = "./uploads";
    console.log(fs.existsSync(_dirPath));
    if (!fs.existsSync(_dirPath)) {
        const mkdir = util.promisify(fs.mkdir);
        mkdir(_dirPath).then((stats) => {
            console.log('folder created successfully ');
        }).catch((error) => {
            console.log(error);
        });
    } else {
        console.log('folder already exist ');
    }
}
module.exports = {
    Run
}