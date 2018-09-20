const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();


let courses = [

    {id:1, courseName:'JavaScript'},
    {id:2, courseName:'Node'},
    {id:3, courseName:'React'}

];


    




router.get('/',(req,res)=>{

    const ParsedArrayOfCourses = _.mapKeys(courses,'id');
    res.send(ParsedArrayOfCourses);

});


router.get('/:id',(req,res)=>{

    const ParsedArrayOfCourses = _.mapKeys(courses,'id');
    const course = ParsedArrayOfCourses[req.params.id];

    if (!course)
        {
            res.status(404).send('the course with the given id was not found');
            return;
        }
    res.send(course);

});


router.post('/',(req,res)=>{

    const result = JoiValidation(req.body);
      
    if (result.error)
    {
        
        res.status(400).send(result.error.details[0].message);
        return;
    }

   const course ={

            id: courses.length + 1,
            courseName: req.body.courseName

   };

   courses.push(course);

   res.send(course);


});




router.put('/:id',(req,res)=>{


    const result = JoiValidation(req.body);
      
    if (result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const ParsedArrayOfCourses = _.mapKeys(courses,'id');
    const course = ParsedArrayOfCourses[req.params.id];

    if (!course)
    {
        res.status(404).send('the course with the given id was not found');
        return;
    }

    course.courseName=req.body.courseName;

    res.send(course);

});


router.delete('/:id',(req,res)=>{
      
    const ParsedArrayOfCourses = _.mapKeys(courses,'id');
    const course = ParsedArrayOfCourses[req.params.id];

    if (!course)
    {
        res.status(404).send('the course with the given id was not found');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});



function JoiValidation (body)
{
    const schema = {courseName: Joi.string().min(3).required()};

    return Joi.validate(body,   schema);

}


module.exports = router;