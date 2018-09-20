function loggingFunction (req,res,next){

    console.log('Logging...');
    next();

}

module.exports.log = loggingFunction;