const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SepCourse', { useNewUrlParser: true })
    .then(()=>{console.log('Connected to DB')})
    .catch((err)=>console.error('could not connect to mongo DB',err));


    const coursSchema= new mongoose.Schema({

            courseName: String,
            author: String,
            tags:[String],
            date:{type: Date, default: Date.now},
            isPublished: Boolean

    });


    const Course = mongoose.model('Course',coursSchema);

    async function CreatingNewDocumetInTheCollection ()
    {
    const course =new Course (

        {
            courseName: 'Node',
            author: 'KarimOthman',
            tags:['Javascript','Technical', 'Backend'],
            isPublished: true
        });

        const result = await course.save();
        
        console.log(result);
    }

    CreatingNewDocumetInTheCollection();