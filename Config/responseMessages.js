
exports.ERROR = {
    INVALID_OPERATION : {
        statusCode:400,
        customMessage : {
            en : 'Invalid operation.',
        },
        type : 'INVALID_OPERATION'
    },
    DB_ERROR: {
        statusCode: 400,
        customMessage: {
            en : 'DB Error : ',
           // ar : 'DB خطأ:'
        },
        type: 'DB_ERROR'
    }, 
    INVALID_OBJECT_ID: {
        statusCode: 400,
        customMessage: {
            en : 'Invalid Id Provided'
           
        },
        type: 'INVALID_OBJECT_ID'
    },
    INVALID_PIN: {
        statusCode: 400,
        customMessage: {
            en : 'Invalid Pin provided. Please try again. If the problem persists, please contact  team.'
           
        },
        type: 'INVALID_PAYMENT_METHOD'
    },
    APP_ERROR: {
        statusCode: 400,
        customMessage: {
            en : 'Application Error ',
         //   ar : 'خطأ في تطبيق'
        },
        type: 'APP_ERROR'
    },
    DUPLICATE: {
        statusCode: 400,
        customMessage: {
            en : 'Duplicate Entry',
          //  ar : 'إدخال مكرر'
        },
        type: 'DUPLICATE'
    },
    DEFAULT: {
        statusCode: 400,
        customMessage: {
            en : 'Something went wrong.',
         //   ar : 'هناك خطأ ما.'
        },
        type: 'DEFAULT'
    },
    UNAUTHORIZED: {
        statusCode:401,
        customMessage : {
            en : 'You are not authorized to perform this action',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'UNAUTHORIZED'
    },
    SESSION_EXPIRED: {
        statusCode:401,
        customMessage : {
            en : 'Your account has been login on another device. Please login again.',
            // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'SESSION_EXPIRED'
    },
    ROLE_CHANGE: {
        statusCode:401,
        customMessage : {
            en : 'Looks like admin has made some changes, Please login again to continue.',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'ROLE_CHANGE'
    },
    INVALID_CREDENTIALS : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! The Email or password is incorrect.',
          //  ar : 'وجه الفتاة! البريد الإلكتروني أو كلمة المرور غير صحيحة.'
        },
        type: 'INVALID_CREDENTIALS'
    }, INVALID_CREDENTIALS_USERNAME : {
        statusCode: 400,
        customMessage: {
            en : 'Oops! The Username or password is incorrect.',
          //  ar : 'وجه الفتاة! البريد الإلكتروني أو كلمة المرور غير صحيحة.'
        },
        type: 'INVALID_CREDENTIALS_USERNAME'
    },
    
    WRONG_PASSWORD: {
        statusCode: 400,
        customMessage: {
            en : 'Password is Incorrect.',
         //   ar : 'كلمة المرور غير صحيحة.'
        },
        type: 'WRONG_PASSWORD'
    } , OLD_WRONG_PASSWORD: {
        statusCode: 400,
        customMessage: {
            en : 'Old Password is Incorrect.',
         //   ar : 'كلمة المرور غير صحيحة.'
        },
        type: 'OLD_WRONG_PASSWORD'
    } ,
   
    EMAIL_NOT_FOUND: {
        statusCode:400,
        customMessage : {
            en : 'Email not found',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'EMAIL_NOT_FOUND'
    },
    ORDER_NOT_FOUND: {
        statusCode:400,
        customMessage : {
            en : 'Order not found',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'ORDER_NOT_FOUND'
    },
    EMAIL_ALREADY_EXIST: {
        statusCode:400,
        customMessage : {
            en : 'This email already exist. Please try with other email',
           // ar : ''
        },
        type : 'EMAIL_ALREADY_EXIST'
    },
    
    BRANCH_NOT_FOUND: {
        statusCode:400,
        customMessage : {
            en :  'BRANCH not found.',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'USER_NOT_FOUND'  
    },
    USER_DELETED: {
        statusCode: 410,
        customMessage : {
            en:  'Your account has been deleted by Admin.',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'USER_DELETED'
    },
    BLOCK_USER: {
        statusCode: 410,
        customMessage: {
            en:  'Your account has been blocked by Admin.',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'BLOCK_USER'
    },
   
    PRICE_CHANGED: {
        statusCode: 400,
        customMessage: {
            en: 'Please referesh your page, some changes made by provider.'
        },
        type: 'PRICE_CHANGED'
    },
    BOOKING_ALREADY_ACCEPTED: {
        statusCode: 400,
        customMessage: {
            en: 'This booking has already accepted.'
        },
        type: 'BOOKING_ALREADY_ACCEPTED'
    },
    
    ORDER_ALREADY_UPDATED: {
        statusCode: 400,
        customMessage: {
            en: ''
        },
        type: 'ORDER_ALREADY_UPDATED'
    },
    SINGLE_TYPE: {
        statusCode: 400,
        customMessage: {
            en: 'Bargin is only allowed on single product'
        },
        type: 'SINGLE_TYPE'
    },
    
    INCORRECT_DETAILS:{
        statusCode:400,
        customMessage : {
            en : 'Invalid details provided',
            //  ar : 'قدمت رقم غير صالح.'
        },
        type : 'INCORRECT_DETAILS'
    },
    NO_RECORDS_FOUND:{
        statusCode:400,
        customMessage : {
            en : 'No records found.',
            //  ar : 'قدمت رقم غير صالح.'
        },
        type : 'NO_RECORDS_FOUND'
    },
    
    NOTIFICATION_ERROR: {
        statusCode: 400,
        customMessage: {
            en: 'Push notification error.'
        },
        type : 'NOTIFICATION_ERROR'
    },
    ORDER_INSIDE_BAR: {
        statusCode:400,
        customMessage : {
            en : 'You should be inside the bar to place an order.',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'ORDER_INSIDE_BAR'
    },
    UPDATE_APP: {
        statusCode:400,
        customMessage : {
            en : 'Please update the app to place an order.',
           // ar : 'لا تملك الصلاحية لتنفيذ هذا الإجراء'
        },
        type : 'UPDATE_APP'
    },
};
exports.SUCCESS = {
    DEFAULT: {
        statusCode: 200,
        customMessage: {
            en : 'Success',
           // ar : 'نجاح'
        },
        type: 'DEFAULT'
    },
    ADDED : {
        statusCode: 200,
        customMessage: {
            en : 'Added successfully.',
           // ar : 'اضيف بنجاح.'
        },
        type: 'ADDED'
    },
    FORGOT_PASSWORD: {
        statusCode: 200,
        customMessage: {
            en: "A reset password link is sent to your registered email address."
        },
        type: 'FORGOT_PASSWORD'
    },
    PASSWORD_RESET_SUCCESSFULL:{
        statusCode:200,
        customMessage:{
            en:"Your Password has been Successfully Changed"
        },
        type:'PASSWORD_RESET_SUCCESSFULL'
    },
    RESET_PASSWORD:{
        statusCode:200,
        customMessage:{
            en:"A reset password OTP has been sent to your registered Phone Number"
        },
        type: 'RESET_PASSWORD'
    }
};