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

        res.send(categories);
        return;
    }

    categories = await Category.find({isLive:true})
        .sort({name:1});

    res.send(categories);

});




router.post('/',async (req,res)=>{

    const result = JoiValidate(req.body, 'postSchema');
      
    if (result.error)
    {
        
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //limitation w hwa by post y2oloo maynfa3sh fee category b nafs el 2esm

    let categories = await Category.find({TechName:req.body.TechName});

    if (categories.length!=0){

        res.send(
            [
                {error:'there is a category with the same name'},
                {category:categories}
            
            ]
    
    );
        return;
    }

    let category = await CreateCategory(req.body);

    res.send(category);

});



router.delete('/:TechName',async(req,res)=>{



        try{
            let categories = await Category.deleteMany({TechName:req.params.TechName},function (err) {
                if (err) {res.status(404).send({error:err});
                            return;
                            }
              });

        
        res.send(categories);
        }

        catch(ex){
            res.status(404).send({error:ex});
        }

});




router.put('/',async (req,res)=>{


    const result = JoiValidate(req.body, 'putSchema');

    if (result.error)
    {
        
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const UpdatedCategory=await PutHelperFunction(req.body);

    res.send(UpdatedCategory);


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



async function PutHelperFunction ({TechName,OperationName,characteristics,subCategories})
{

    console.log(TechName,OperationName,characteristics,subCategories);

    let RequestArray= null;
    let Key = 'characteristics';
    let MongooseOperation = '$push';

    if (OperationName=='AddChar'){
      
         Key = 'characteristics';
         RequestArray= characteristics;
         MongooseOperation = '$push';
    }

    else if (OperationName=='DeleteChar'){
      
         Key = 'characteristics';
         RequestArray= characteristics;
         MongooseOperation = '$pullAll';
    }

    else if (OperationName=='AddSub'){
      
         Key = 'subCategories';
         RequestArray= subCategories;
         MongooseOperation = '$push';
    }

    else if (OperationName=='DeleteSub'){
      
         Key = 'subCategories';
         RequestArray= subCategories;
         MongooseOperation = '$pullAll';
    }

    else{

        return 'Operation Undefined';
    }


    return  UpdatedCategory = await Category.findOneAndUpdate({TechName:TechName},{

        [MongooseOperation]:{

            [Key]:RequestArray
        }
    },{new:true});
}