const otp=(number)=>{
    var accountSid = 'AC7dfbcf45eef13835b106cc87ba1634ae'; // Your Account SID from www.twilio.com/console
    var authToken = '410420107cc3d5c8e36be32aff3da4f9';   // Your Auth Token from www.twilio.com/console
    
    var OTP = Math.floor(1000+Math.random() * 9000)
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        body:"your otp is "+OTP,
        
        from:"+19045670672",
        to:number
    }).then((message)=>{
    return message})
    .catch((err)=>console.log(err))
    return OTP
    }
    
    module.exports={
        otp,
        
    }