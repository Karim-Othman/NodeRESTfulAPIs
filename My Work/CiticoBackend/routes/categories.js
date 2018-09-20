const mongoose = require('mongoose');
const {JoiValidate, categorySchema} = require('../models/model-categories');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

const Category = mongoose.model('category',categorySchema);




router.get('/',async(req,res)=>{

    let categories = null;
    if(req.query.TechName)
    {
         categories = await Category.find({TechName:req.query.TechName})
        .and([{isLive:true}])
        .sort({name:1});
    }

    categories = await Category.find({isLive:true})
        .sort({name:1});

    res.send(categories);

});




router.post('/',async (req,res)=>{

    const result = JoiValidate(req.body);
      
    if (result.error)
    {
        
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let category = await CreateCategory(req.body);

    res.send(category);


});





module.exports = router;


async function CreateCategory (body)
{
    
    const category =new Category (body);

       
        try{
             const result = await category.save();
             return result;
        }
        
        catch(ex){

             const result = ex.message;
             return result;
        }
        
        

}