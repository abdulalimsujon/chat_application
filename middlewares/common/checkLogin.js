const jwt = require('jsonwebtoken')

const checkLogin=(req,res,next)=>{
    let cookies = 
    Object.keys(req.signedCookies).length>0 ? req.signedCookies : null;


    if(cookies){
        try{
            token =  cookies[process.env.COOKIE_NAME];

          const decoded = jwt.verify(token,process.env.JWT_SECRATE);

          req.user = decoded;

          // pass the user info to response locals

          if(res.locals.html){
            res.locals.loggedInUser = decoded;
          }

          next();
        }catch(error){

            if(res.locals.html){

                res.redirect('/');

            }else{
                res.status(500).json({
                    errors:{
                        common:{
                            msg: 'authentication failed'
                        }
                    }
                })
            }


        }
    }else{

        if(res.locals.html){

            res.redirect('/');

        }else{
            res.status(401).json({
                errors:{
                    common:{
                        msg: 'authentication failed'
                    }
                }
            })
        }


    }
}



const redirectLoggedIn=(req,res,next)=>{
    

    let cookies = 
    Object.keys(req.signedCookies).length>0 ? req.signedCookies : null;

    if(!cookies){
        next();
    }else{
        res.redirect('/inbox')
    }
}
module.exports = {
    checkLogin,
    redirectLoggedIn

};