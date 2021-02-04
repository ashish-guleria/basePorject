var Config = require('../Config');
// var async = require('async');
// var SocketManager = require('../Lib/SocketManager');
var schedule = require('node-schedule');
var Models = require('../Models')
const DAO = require('../DAOManager').queries;

const resetPrice = async () =>{
    // {hour: 12, minute: 0}
    var j = schedule.scheduleJob({hour: 0, minute: 30}, async () => {
        const stocks = await DAO.getData(Models.Stocks,{
            itemType:Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE
        },{stockUnitVariationSale:1,basePrice:1});
        for(let i =0; i<stocks.length;i++){
            await DAO.findAndUpdate(Models.Stocks,{_id:stocks[i]._id},{stockUnitVariationSale:0,currentPrice:stocks[i].basePrice})
        }
    })
}

module.exports = {
    // bootstrapScheduler,
    resetPrice
};