const {check, validationResult} = require('express-validator');


const doLoginValidator=[
    check('username')
    .isLength({
        min:1
    }).withMessage('mobile number or name is required'),
    check('password').isLength({min:1}).withMessage('password is required')
]

const doLoginValidatorHandler = function (req,res,next){

    const errors= validationResult(req);
    
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length===0){
        next();
    }else{
        res.render('index',{
            data:{
                username:req.body.username
            },
            errors:mappedErrors
        })
    }



}
module.exports={
    doLoginValidator,
    doLoginValidatorHandler
}