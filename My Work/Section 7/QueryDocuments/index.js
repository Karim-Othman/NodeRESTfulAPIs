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
    


    // ****************************
    // *                          *
    // *      Simple Query        *
    // *                          *
    // ****************************


    async function GetCourse (){

        const courses = await Course.find({tags:'Frontend' })
                                    .limit(10)
                                    .sort({courseName:1})
                                    .select({courseName:1,isPublished:1});

        console.log(courses);


    }

    GetCourse();

