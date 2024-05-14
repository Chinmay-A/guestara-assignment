const mongoose=require('mongoose')
const {Item,Subcategory,Category}=require('./schema.js')
const connect=require('./connect.js')

connect();

Item.createCollection();
Subcategory.createCollection();
Category.createCollection();

setTimeout(() => {
    console.log('Collections created on server');
    process.exit();
}, 5000);