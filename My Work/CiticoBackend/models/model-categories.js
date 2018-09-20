const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/Citico', { useNewUrlParser: true })
    .then(()=>{console.log('Connected to DB')})
    .catch((err)=>console.error('could not connect to mongo DB',err));


    const categorySchema= new mongoose.Schema({

            TechName: {type:String, required:true},
            ARCommName: {type:String, required:true},
            ENCommName: {type:String, required:true},
            subCategories:[{subCatTechName:{type:String, required:function(){return this.subCatARCommName}},
                            subCatARCommName:{type:String, required:function(){return this.subCatENCommName}},
                            subCatENCommName:{type:String, required:function(){return this.subCatARCommName}},
                            isLive:{type:Boolean, default:true}
            }],
            date:{type: Date, default: Date.now},
            isLive: {type:Boolean, default:true},
            characteristics:[String]

    });





    function JoiValidation (body)
    {
    const schema = {
    
                    TechName:Joi.string().required(),
                    ARCommName:Joi.string().required(),
                    ENCommName:Joi.string().required(),
                    subCategories:Joi.array(),
                    date:Joi.date(),
                    isLive:Joi.boolean(),
                    characteristics:Joi.array()
    };

    return Joi.validate(body,   schema);

    }


    

    exports.JoiValidate = JoiValidation;
    exports.categorySchema = categorySchema;