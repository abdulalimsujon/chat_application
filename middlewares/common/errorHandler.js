
const createError = require('http-errors');

function NotFoundHandler(req,res,next){
    next(createError(404,'your request context was notff found'))
}



// default error handler
function errorHandler(err,req,res,next){
    res.locals.error =
    process.env.NODE_ENV === 'development' ? err:{message:err.message}

    res.status(err.status || 500);

    if(!res.locals.html){

        //html response
        res.render('error',{
            title:"error message",
        });
    }else{
        //api response
        res.json(res.locals.error)
   
    }
}

module.exports = {
    NotFoundHandler,errorHandler
}