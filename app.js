const express=require('express');
const APIrouter=require('./router.js');
const connect=require('./connect.js');
const dotenv=require('dotenv');

dotenv.config()

//connecting to the remote mongo server
connect();

//initializing the app
const app=express();

app.get('/',(req,res)=>{
    
    res.status(200).send('Guestara Intern Assignment Home by: chinmayaons1@gmail.com');
    res.end();
})

// forwrard the request for the api to the router
app.use('/api',APIrouter);

app.listen(process.env.PORT);

console.log(`Serving app at: http://127.0.0.1:${process.env.PORT}`)