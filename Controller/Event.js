const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    Models = require('../Models');
  


const createEvent = async (payload) => {
    const {eventName,venue,startingTime,endingTime,description,gestLimit,category,hostingEventAs,partyImages}=payload
    

    result = await DAO.saveData(Models.Event, payload);


    return result

}

module.exports={
    createEvent,
}