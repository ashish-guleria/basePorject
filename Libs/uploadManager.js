const Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    fs = require('fs')



    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    uuidv4()


const upload = (payload) => {

    return new Promise((resolve, reject) => {
        try {
            if (payload['file'].length == undefined) {
                var unique = uuidv4()
                var result = [];

                result.push(payload["file"].hapi);
                payload['file'].hapi.filename = unique + " " + payload['file'].hapi.filename
                const value = fs.createWriteStream("./upload/" + payload["file"].hapi.filename)
                const well = payload["file"].pipe(value)
                resolve(result);
            }
            else {

                var result = [];
                for (var i = 0; i < payload["file"].length; i++) {
                    var unique = uuidv4()

                    result.push(payload["file"][i].hapi);
                    payload['file'][i].hapi.filename = unique + " " + payload['file'][i].hapi.filename
                    payload["file"][i].pipe(fs.createWriteStream("./upload/" + payload["file"][i].hapi.filename))
                    resolve(result)
                }
            }










        } catch (err) {
            reject(err)

        }
    })
}


module.exports = {
    upload
}