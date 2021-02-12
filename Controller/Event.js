const { startTimer } = require('winston');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    Models = require('../Models');



const createEvent = async (payload) => {
    const { eventName, venue, startingTime, endingTime, description, gestLimit, category, hostingEventAs, partyImages } = payload

    let query = {
        venue
    };
    console.log(query)
    let result = await DAO.getDataOne(Models.Event, query, { startingTime: 1,endingTime:1,venue:1}, { limit: 1 });
    if (result!==null) {
        if (result.venue == venue) {
            if ( startingTime.getTime()  >=result.startingTime.getTime()  &&  startingTime.getTime() <=result.endingTime.getTime()
            || endingTime.getTime()  >=result.startingTime.getTime()  &&  endingTime.getTime() <=result.endingTime.getTime()) {
                throw ERROR.INCORRECT_DETAILS
    }



     result = await DAO.saveData(Models.Event, payload);      
        }
    }
    return result
}






module.exports = {
    createEvent,
}