const FCM = require('fcm-node');
const serverKey = '2121212121cghcv';
const fcm = new FCM(serverKey);


/*
 ==============================================
 Send the notification
 =============================================
 */


function sendPushNotification(message1,deviceToken) {


   var message = {
        registration_ids: deviceToken,
        notification: {
            title: 'Testing',
            body: message1.message,
            type: message1.type,
            sound: 'default',
            badge: 1
        },
        data: message1,
        priority: 'high'
    };
    fcm.send(message, function (err, result) {
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", result);
        }
    });
}

module.exports = {
    sendPushNotification
};