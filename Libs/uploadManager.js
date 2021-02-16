const Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    fs = require('fs')


const upload = (payload) => {
    console.log(payload['file'].hapi.filename)
return new Promise((resolve,reject)=>{
    try {

        var unique=new Date().getTime();
        var result = [];
        
        //result.push(payload["file"].hapi);
        payload['file'].hapi.filename=unique+" "+payload['file'].hapi.filename
        const value=fs.createWriteStream("./upload/" + payload["file"].hapi.filename)
        const well = payload["file"].pipe(value)
        resolve (value,console.log(payload));





        // {
        //     var result = [];
        //     for (var i = 0; i <request.payload["file"].length; i++) {
        //        // console.log(i)
        //         result.push(request.payload["file"][i].hapi);
        //         request.payload["file"][i].pipe(fs.createWriteStream( "./images/"  + request.payload["file"][i].hapi.filename))
        //     }



    } catch (err) {
        reject(err)

    }
})
}


module.exports={
    upload
}