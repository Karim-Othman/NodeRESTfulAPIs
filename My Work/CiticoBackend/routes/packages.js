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

