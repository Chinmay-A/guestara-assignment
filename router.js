const express=require('express')
const api=require('./api.js')

const router=express.Router()

// Assigning the GET endpoints to the particular methods
router.get('/category',api.GetCategory)
router.get('/subcategory',api.GetSubcategory)
router.get('/item',api.GetItem)

// Assigning the POST endpoints to the particular methods
router.post('/category',api.CreateCategory)
router.post('/subcategory',api.CreateSubcategory)
router.post('/item',api.CreateItem)

// Assigning the PUT endpoints to the particular methods
router.put('/category',api.EditCategory)
router.put('/subcategory',api.EditSubcategory)
router.put('/item',api.EditItem)

// Assigning the SEARCH api to the particular method
router.get('/search/item',api.SearchItem)

module.exports=router;