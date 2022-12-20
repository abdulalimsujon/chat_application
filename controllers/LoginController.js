const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')



function getLogin(req,res,next){
    res.render('index')
}


const User = require('../models/People')

async function login(req,res,next){

try{

    const user = await User.findOne({
        $or: [{email:req.body.username},{mobile:req.body.mobile}]
    })

    if(user && user._id){

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password


        )

        if(isValidPassword){
            // prepare the object to generate the token 

            const userObject = {
                username : user.name,
                mobile:user.mobile,
                email:user.email,
                role:"user"

            };

            //generate the token

            const token = jwt.sign(
                userObject,process.env.JWT_SECRATE,{
               expiresIn:process.env.TOKEN_EXPIRY}
                )

            // set cookie

            res.cookie(process.env.COOKIE_NAME,token,{
                maxAge:process.env.TOKEN_EXPIRY,
                httpOnly:true,
                signed:true

            })

            // set loogged in user local identifier

            res.locals.loggedInUser=userObject;

            res.render('inbox')
        
        }else{

            throw createError('login failed!! try again')

        }

    }else{
        throw createError('login failed!! try again')

    }

}catch(error){

    res.render('index',{
        data:{

            username:req.body.username

        },
        errors:{
            common:{
                msg:error.message
            }
        }
    })


}
}
// do logout 
function logout(req,res){
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('logout')
}



module.exports = {
    getLogin,
    logout,
    login
}