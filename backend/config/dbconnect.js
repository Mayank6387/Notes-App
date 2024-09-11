const mongoose=require('mongoose');
const config =require('./config')
const connectDb=async()=>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log("Connected to Db");
        })
    }
    catch(err){
        console.log("Connection to Db failed",err);
    }
    await mongoose.connect(config.mongostring);
}


module.exports=connectDb;


