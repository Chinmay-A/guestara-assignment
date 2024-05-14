const {request, response}=require('express')
const {Item, Subcategory, Category}= require('./schema.js');

//  This file defines the methods for the API
//  Data is sent as the request query for each endpoint

module.exports.CreateCategory=async (request,response)=>{

    let params=request.query;

    // Assigning query parameters to relevant fields according to the schema
    let category_data={

        name: params.name,
        image: params.image,
        description: params.description,
        taxapplicable: params.taxapplicable,
        taxin: params.taxin,
        taxtype: params.taxtype
    }

    let new_category= new Category(category_data)

    // Save to the remote Mongo Server, returns status 201 for successful addition, 500 if the document could not be added
    try{
        let created_category= await new_category.save();
        console.log('here')
        response.status(201).send(`Created category with category id: ${created_category._id}`)
    }
    catch(error){
        response.status(500).send('Internal Server Error: Could not create category')
    }

}

module.exports.CreateSubcategory=async (request,response)=>{

    let params=request.query;

    // Parent category specified in the request query in the 'catid' field
    let category_check= await Category.find({_id: params.catid})

    // Checking if the parent category exists, throws an error with status 400 if the parent category does not exist
    if(category_check.length!=0){

        let subcategory_data={

            name: params.name,
            image: params.image,
            description: params.description,
            catid: params.catid,
            taxapplicable: false
        }

        if(category_check[0].taxapplicable==true){
            
            subcategory_data={

                name: params.name,
                image: params.image,
                description: params.description,
                taxapplicable: category_check[0].taxapplicable,
                taxin: category_check[0].taxin,
                catid: params.catid
            }
            
        }
    
        let new_subcategory= new Subcategory(subcategory_data)
        
        
        try
        {
            let created_subcategory=await new_subcategory.save()
            
            await Category.findByIdAndUpdate(params.catid,{$push:{subcategories:{subcatid: created_subcategory._id}}},{new: true})

            response.status(201).send(`Created new subcategory with id: ${created_subcategory._id}`)
        }
        catch(error)
        {
            console.log(error);
            response.status(500).send('Internal Server Error: Could not create subcategory');
        }
        

    }
    else{
        response.status(400).send('Invalid Category ID, category does not exist')
    }
    
}


module.exports.CreateItem=async (request,response)=>{

    let params= request.query;

    // Parent Subcategory given as part of query in the 'subcatid' field
    let subcategory_check= await Subcategory.find({_id: params.subcatid})

    // check if the parent Subcategory exists, returns error with status 400 if the the parent subcategory does not exist
    if(subcategory_check.length!=0){

        let item_data={
            name: params.name,
            image: params.image,
            description: params.description,
            baseamount: params.baseamount,
            discount: params.discount,
            totalamount: params.baseamount-params.discount,
            subcatid: params.subcatid,
            catid: subcategory_check[0].catid,
            taxapplicable: subcategory_check[0].taxapplicable,
            taxin: subcategory_check[0].taxin
        }

        let new_item= new Item(item_data);

        try{

            let created_item= await new_item.save();
            await Subcategory.findByIdAndUpdate(created_item.subcatid,{$push:{items:{itemid:created_item._id}}});

            response.status(201).send(`Item added with item id: ${created_item._id}`);

        }
        catch(error){
            console.log(error);
            response.status(500).send('Internal Server Error: Could not add Item');
        }

    }
    else{
        response.status(400).send('Invalid Subcategory ID, subcategory does not exist');
    }

    
}

module.exports.GetCategory=async (request,response)=>{

    let params=request.query;
    // filter according to the query, returns all if no filter
    
    try{
        let categories= await Category.find(params);
        response.status(200).send(categories);
    }
    catch(error)
    {
        console.log(error);
        response.status(500);
    }
}


module.exports.GetSubcategory=async (request,response)=>{

    let params=request.query;
    
    // filter according to the query, returns all if no filter

    try{
        let categories= await Subcategory.find(params);
        response.status(200).send(categories);
    }
    catch(error)
    {
        console.log(error);
        response.status(500);
    }
}

module.exports.GetItem=async (request, response)=>{

    let params=request.query;
    
    // filter according to the query, returns all if no filter
    
    try{
        let categories= await Item.find(params);
        response.status(200).send(categories);
    }
    catch(error)
    {
        console.log(error);
        response.status(500);
    }
}

module.exports.EditCategory=async (request, response)=>{

    let params=request.query;

    try{

        let updated_category=await Category.findByIdAndUpdate(params._id,params,{new:true});
        response.status(201).send(updated_category);
    }
    catch(error){
        console.log(error);
        response.send(400).send('Could not update category')
    }
}

module.exports.EditSubcategory=async (request, response)=>{

    let params=request.query;

    try{

        let updated_subcategory=await Subcategory.findByIdAndUpdate(params._id,params,{new:true});
        response.status(201).send(updated_subcategory);
    }
    catch(error){
        console.log(error);
        response.send(400).send('Could not update Subcategory')
    }
    
}

module.exports.EditItem=async (request, response)=>{

    let params=request.query;

    try{

        let updated_item=await Item.findByIdAndUpdate(params._id,params,{new:true});
        response.status(201).send(updated_item);
    }
    catch(error){
        console.log(error);
        response.send(400).send('Could not update Item')
    }
    
}

module.exports.SearchItem=async (request,response)=>{

    let params=request.query;

    try{
        let matches=await Item.find({name: new RegExp(params.name,'i')});
        response.status(200).send(matches);
    }
    catch(error){
        console.log(error);
        response.status(500).send('Internal Server Error')
    }

}