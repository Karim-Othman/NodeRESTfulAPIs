const mongoose = require('mongoose');
const Joi = require('joi');


const packagedDetailedDesc =new mongoose.Schema({
    Title:String,
    Desc:[String]});

const HotelsAndRatesSchema =new mongoose.Schema({
    HotelName:String,
    Location:String,
    Date:String,
    Rating:String,
    SinglePrice:String,
    DoublePrice:String,
    TriplePrice:String,
    QuadPrice:String,
    ChildPrice:String,
});

const TermsAndConditionsSchema =new mongoose.Schema({
    Title:String,
    Desc:[String]});


const OptionalToursSchema =new mongoose.Schema({
    Name:String,
    Desc:String,
    image:String,
});

const packageSchema= new mongoose.Schema({

    TechName: {type:String, required:true},
    ARCommName: {type:String, required:true},
    ENCommName: {type:String, required:true},
    RelativeTo: {type:String, required:true},
    ARDesc: String,
    ENDesc: String,
    Price: String,
    PriceUnit: String,
    Location: String,
    Images:[String],
    Flags:{ type : Array , "default" : [] },
    ARDetailedDesc:[packagedDetailedDesc],
    ARHotelsAndRates:[HotelsAndRatesSchema],
    AROptionalTours:[OptionalToursSchema],
    ARTermsAndConditions:[TermsAndConditionsSchema],
    ARVisaRequirements:[String],
    ENDetailedDesc:[packagedDetailedDesc],
    ENHotelsAndRates:[HotelsAndRatesSchema],
    ENOptionalTours:[OptionalToursSchema],
    ENTermsAndConditions:[TermsAndConditionsSchema],
    ENVisaRequirements:[String]
    
});


function JoiValidation (body)
    {

        const schema ={ 
            TechName:Joi.string().required(),
            ARCommName:Joi.string().required(),
            ENCommName:Joi.string().required(),
            RelativeTo:Joi.string().required(),
            Images:Joi.array(),
            Flags:Joi.array(),
            ARVisaRequirements:Joi.array(),
            ENVisaRequirements:Joi.array(),
            ARDetailedDesc:Joi.array(),
            ARHotelsAndRates:Joi.array(),
            AROptionalTours:Joi.array(),
            ARTermsAndConditions:Joi.array(),
            ENDetailedDesc:Joi.array(),
            ENHotelsAndRates:Joi.array(),
            ENOptionalTours:Joi.array(),
            ENTermsAndConditions:Joi.array()

            };

         return Joi.validate(body,   schema);

    }


    exports.PackageJoiValidation = JoiValidation;
    exports.packageSchema = packageSchema;