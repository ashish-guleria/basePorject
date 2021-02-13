const { startTimer } = require('winston');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    Models = require('../Models');
const fs = require('fs')




const createEvent = async (payload,userDetail) => {


    let query={
        userId:userDetail._id,
        eventName:payload.eventName,
        venue:payload.venue,
        startingTime:payload.startingTime,
        endingTime:payload.endingTime,
        description:payload.description,
        gestLimit:payload.gestLimit,
        category:payload.category,
        hostingEventAs:payload.hostingEventAs,
        partyImage:payload.partyImage
    }


    console.log(query)
    //let result = await DAO.getDataOne(Models.Event, query, { startingTime: 1, endingTime: 1, venue: 1 }, { limit: 1 });
    // if (result !== null) {
    //     if (result.venue == venue) {
    //         if (startingTime.getTime() >= result.startingTime.getTime() && startingTime.getTime() <= result.endingTime.getTime()
    //             || endingTime.getTime() >= result.startingTime.getTime() && endingTime.getTime() <= result.endingTime.getTime()) {
    //             throw ERROR.INCORRECT_DETAILS
    //         }
    //     }
    // }

    result = await DAO.saveData(Models.Event, query);

    
return result
}






const images = async (request) => {
    try {
        var result = [];
        for (var i = 0; i < request.payload["file"].length; i++) {
            console.log(i)
            result.push(request.payload["file"][i].hapi);
            const well = request.payload["file"][i].pipe(fs.createWriteStream("./images/" + request.payload["file"][i].hapi.filename))
            console.log(well.path)
        }
        console.log("upload sucessfilly")
        return (result);
    } catch (err) {
        console.log(err)

    }

}






module.exports = {
    createEvent,
    images
}