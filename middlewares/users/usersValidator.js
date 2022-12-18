const {check,validationResult} = require('express-validator')
const createError = require('http-errors')
const {unlink }=  require('fs')
const path = require('path')
const User = require("../../models/People");

//add users

const addUserValidators =[

    check('name')
    .isLength({min:1})
     .isAlpha('en-US',{ignore:"-"})
     .withMessage('name must not contain anything other than alphabet')
     .trim(),

     check('email')
     .isEmail()
     .withMessage('invalid email address')
     .trim()
     .custom(async(value)=>{

        try{
            const user = await User.findOne({email:value})

            if(user){
                throw creatError('Email already is use!!')
            }

        }catch(error){
            throw createError(error.message)
        }

     }),


     check('mobile')
     .isMobilePhone("bn-BD",{
        strictMode:true
     })
     .withMessage('must be bangledeshi valid number')
     .custom(async(value)=>{
        try{
            const user = await User.findOne({mobile:value});
            if(user){
                throw( createError("mobile already is use"))
            }
        }catch(error){
            throw(createError(error.message))
        }
     }),

     check('password')
     .isStrongPassword()
     .withMessage('password must be 8 character at least 1 lowercase 1 upercase  1 number 1 symbol')
   
];

const addUserValidationHandler = function(req,res,next){

    const errors = validationResult(req);
    const mappedErrors = errors.mapped(); //it will be an object 

    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{

        if(req.files.length>0){
            const {filename} = req.file[0];
            unlink(
                path.join(__dirname,`/../public/uploads/avatars/${filename}`),
                
                (err)=>{
                    if(err){
                        console.log(err)
                    }
                }
            )
        }

        res.status(500).json({
            errors: mappedErrors,
        })

    }

}

module.exports={
    addUserValidators,
    addUserValidationHandler
}