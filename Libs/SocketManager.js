const options={
    cors:true,
   }
const io = require('socket.io')(8003,options);

const connectSocket = () => {


io.on('connection', client => {

  client.on('disconnect', () => { 
      console.log("======disconnect=====")
   });
});

}

const PriceVariation = (data) => {
    console.log("=====socket trigger========",data)

    io.emit("priceUpdate",data);
}


module.exports = {
    connectSocket,
    PriceVariation
}