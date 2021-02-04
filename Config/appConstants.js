var SERVER = {
    APP_NAME: 'OnToes',
    SECRET:"#DubaIIeOkCfGdHahSHHSh",
    SALT:11,
    JWT_SECRET_KEY_BRANCH:"#GD%$HFD&&$DFDKI12~#^%&*+_->?L%QF",
    JWT_SECRET_KEY_ADMIN:   "vdfeg%%$$##r#FEF$#@#&^^&(#",
    JWT_SECRET_KEY_USER:    "%#%$FDFGVRG%HRTB%^TG^$G",
    JWT_SECRET_KEY_CAPTAIN:    "^&%$VFF%dfgef$%$%$GRTB%",
   };

var swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];

var SCOPE = {
        ADMIN: 'ADMIN',
        BRANCH: 'BRANCH',
        USER: 'USER',
        CAPTAIN:"CAPTAIN",
        USER_CAPTAIN:"USER_CAPTAIN",

        BRANCH_USERS_ADMIN:"BRANCH_USERS_ADMIN",
        BRANCH_USERS_ADMIN_CAPTAIN:"BRANCH_USERS_ADMIN_CAPTAIN",

        BRANCH_CAPTAIN:"BRANCH_CAPTAIN",
        ADMIN_BRANCH:"ADMIN_BRANCH",
        
};


var MODELS = {
    Admins:"Admins",
    
    Customer:"Customer",
    
    User:"User",
    
};

var DATABASE_CONSTANT ={

    
    GENDER:{
        MALE:"Male",
        FEMALE:"Female"
    },

    ORDER_STATUS:{
        PENDING:"Pending",
        CONFIRMED:"Confirmed",
        REJECT: "Reject"
    },
    
    DEVICE_TYPES: {
        "IOS": "IOS",
        "ANDROID": "ANDROID",
        "WEB": "WEB"
    },
    SOCIAL: {
        FACEBOOK: "Facebook",
        GOOGLE: "Google"
    },
    WINE_TYPE: {
        BOTTLE: 'BOTTLE',
        GLASS: 'GLASS',
        PEG: 'PEG'
    },
    ITEM_TYPE: {

        WINE: 'WINE',
        FOOD: 'FOOD'
    },
   
    
    ACCOUNT_TYPE : {
        GMAIL:'gmail',
        FACEBOOK: 'facebook',
        EMAIL: 'email',
        APPLE_ID:'apple'
    },

    PARTY_TYPE:{
        POOL:'pool',
        KARAOKE:'karaoke',
        BIRTHDAY:'birthday',
        MUSIC:'music',
        DRINKING:'drinking'
    },
    USER_TYPE:{
        HOST:'host',
        GEST:'GEST'
    }
};


var APP_CONSTANTS = {
    SERVER: SERVER,
    swaggerDefaultResponseMessages:swaggerDefaultResponseMessages,
    SCOPE:SCOPE,
    MODELS:MODELS,
    DATABASE_CONSTANT:DATABASE_CONSTANT
};

module.exports = APP_CONSTANTS;
