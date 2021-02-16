

const Hapi = require('@hapi/hapi'),
    path = require('path'),
    Config = require('./Config'),
    winston = require('winston'),
    mongoose = require('mongoose');

// global.ObjectId = mongoose.Types.ObjectId;
const Models = require('./Models/'),
    DAO = require('./DAOManager').queries,
    SocketManager = require('./Libs/SocketManager');
Scheduler = require('./Libs/Scheduler');

if (process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'testing'
    && process.env.NODE_ENV !== 'client') {
    // console.log(
    //     `Please specify one of the following environments to run your server
    //         - development
    //         - production

    // Example :NODE_ENV=development pm2 start server.js --log-date-format 'DD-MM HH:mm:ss.SSS' --name="dev" -i 2`
    // );
    // throw { abc: 'abc' };
    process.env.NODE_ENV = 'development'
}
// if(process.env.NODE_ENV == "client" ){
//     console.log =  function() {};
// }

Routes = require('./Routes');
Plugins = require('./Plugins');
Bootstrap = require('./Utils/Bootstrap')

process.env.NODE_CONFIG_DIR = __dirname + '/Config/';

const init = async () => {

    const server = Hapi.Server({
        app: {
            name: Config.APP_CONSTANTS.SERVER.APP_NAME
        },
        port: Config[process.env.NODE_ENV].port,
        routes: {
            cors: true
        }
    });
    // Register All Plugins
    await server.register(Plugins);

    // API Routes
    await server.route(Routes);


    server.route(
        [{
            method: 'GET',
            path: '/{file*}',
            handler: {
                directory: {
                    path: 'upload'
                }
            },
            config: {
                auth: false
            }
        }]
    );

    server.events.on('response', request => {
        // console.log(`[${request.method.toUpperCase()} ${request.url.pathname} ]`)
        // console.log(`[${request.method.toUpperCase()} ${request.url.pathname} ](${request.response.statusCode || "error null status code"}) : ${request.info.responded-request.info.received} ms`);
    });

    // Start Server
    try {
        await server.start();
        SocketManager.connectSocket();
        //Scheduler.bootstrapScheduler();
        Scheduler.resetPrice()

        // winston.log(`Server running at ${server.info.uri}`);
    } catch (error) {
        // winston.log("info",error);
    }

};

process.on('uncaughtException', (code) => {
    //console.log(`About to exit with code: ${code}`);
});

process.on('unhandledRejection', (code) => {
    //console.log(`About to exit with code: ${code}`);
});

init();
