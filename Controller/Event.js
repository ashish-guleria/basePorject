const { startTimer } = require('winston');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    Models = require('../Models'),
    upload = require('../Libs/uploadManager'),
    fs = require('fs');

const createEvent = async (payload, userDetail) => {

    let query = {
        userId: userDetail._id,
        eventName: payload.eventName,
        venue: payload.venue,
        startingTime: payload.startingTime,
        endingTime: payload.endingTime,
        description: payload.description,
        gestLimit: payload.gestLimit,
        category: payload.category,
        hostingEventAs: payload.hostingEventAs,
        partyImage: payload.partyImage
    }

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

const viewParty = async (payload, userDetail) => {

    let result = await DAO.getData(Models.Event, {}, {})
    console.log(result)
    return result

}


const images = async (payload, userDetail) => {


    let imgDetail = await upload.upload(payload)
    var imgName = [];
    const query = {
        _id: payload.partyId
    }
    
    for (var i = 0; i < imgDetail.length; i++) {
        imgName.push(imgDetail[i].filename)

    }
    //console.log(query)
    console.log(imgName)

  let result=await DAO.update(Models.Event,query,{$push:{partyImage:imgName}},{ })

    //console.log(userDetail)

    //console.log("--------------------------",request.payload)

    return result

}

module.exports = {
    createEvent,
    images,
    viewParty
}