const mongoose = require('mongoose');
const {PackageJoiValidation, packageSchema} = require('../models/model-packages');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

const Package = mongoose.model('package',packageSchema);


router.post('/',async (req,res)=>{

    const result = PackageJoiValidation(req.body);
      
    if (result.error)
    {
        
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //limitation w hwa by post y2oloo maynfa3sh fee category b nafs el 2esm

    let packages = await Package.find({TechName:req.body.TechName});

    if (packages.length!=0){

        res.send(
            [
                {error:'there is a package with the same name'},
                {package:packages}
            
            ]
    
    );
        return;
    }

    let category = await CreatePackage(req.body);

    res.send(category);

});



router.get('/',async(req,res)=>{

    let packages = null;
    if(req.query.TechName)
    {
         packages = await Package.find({TechName:req.query.TechName})
        .sort({name:1});

        res.send(packages);
        return;
    }

    else if(req.query.RelativeTo)
    {
         packages = await Package.find({RelativeTo:req.query.RelativeTo})
        .sort({name:1});

        res.send(packages);
        return;
    }

    packages = await Package.find()
        .sort({name:1});

    res.send(packages);

});



router.delete('/:TechName',async(req,res)=>{



    try{
        let packages = await Package.deleteMany({TechName:req.params.TechName},function (err) {
            if (err) {res.status(404).send({error:err});
                        return;
                        }
          });

    
    res.send(packages);
    }

    catch(ex){
        res.status(404).send({error:ex});
    }

});


module.exports = router;

async function CreatePackage (body)
{
    
    const package =new Package (body);

       
        try{
             const result = await package.save();
             return result;
        }
        
        catch(ex){

             const result = ex.message;
             return result;
        }
        
        

}

