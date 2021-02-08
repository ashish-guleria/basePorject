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

            if (startingTime.getTime() == result.startingTime.getTime()) {
                if (endingTime.getTime() == result.endingTime.getTime()) throw ERROR.INVALID_OPERATION
            }
        }
    }
    result = await DAO.saveData(Models.Event, payload);

console.log(startingTime,result.startingTime,endingTime,result.endingTime)
    if ( startingTime  >=result.startingTime  &&  startingTime <=result.endingTime) {
        console.log(true)
       
      }else{
          console.log(false)
      }
      

    return result
}

module.exports = {
    createEvent,
}