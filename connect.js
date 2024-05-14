const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

const dburi=process.env.DBURI;

// attempt connection to the remote mongo server
var connection=async()=>{
    
    mongoose.connection.on('connected',()=>console.log('connected with host: ', mongoose.connection.host));
    mongoose.connection.on('disconnected',()=>console.log('disconnceted'))

    try{
        await mongoose.connect(dburi);
    }
    catch(error){
        console.log("Connection failed with error: ",error);
    }
}

module.exports=connection;