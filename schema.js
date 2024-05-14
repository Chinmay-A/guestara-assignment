const mongoose=require('mongoose')


 
//    Define the database schemas for Item, Category and Subcategory.
//    Each Category has an array of subcategories associated with it, only the subcategory id is stored as a foreign key.
//    Each Subcategory has an array of items associated with it, only the item is is stored as a foreign key.
//    Each Item has foreign keys for its parent subcategory and category.
//    Each Subcategory has a foreign key associating it with its parent category.

// Defining the Item Schema
const item=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    taxapplicable:{
        type: Boolean,
        required: true
    },
    taxin:{
        type: Number,
        required: false
    },
    baseamount:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    totalamount:{
        type: Number,
        required: true
    },
    subcatid:{
        type: String,
        required: true
    },
    catid:{
        type: String,
        required: true
    }
});

//Defining the Subcategory Schema
const subcategory=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    taxapplicable:{
        type: Boolean,
        required: true
    },
    taxin:{
        type: Number,
        required: false
    },
    catid:{
        type: String,
        required: false
    },
    items:{
        type: [{itemid: String}],
        required: false
    }
});

//Defining the Category Schema
const category=mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    taxapplicable:{
        type: Boolean,
        required: true
    },
    taxin:{
        type: Number,
        required: false
    },
    taxtype:{
        type: String,
        required: false
    },
    subcategories:{
        type: [{subcatid: String}],
        required: false
    }
});


// Creating Models from the Schemas
var Item = mongoose.model('Item',item);
var Subcategory= mongoose.model('Subcategory',subcategory);
var Category=mongoose.model('Category',category)


//Exporting for reference from other modules
module.exports.Item=Item;
module.exports.Subcategory=Subcategory;
module.exports.Category=Category;