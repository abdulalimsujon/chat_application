
const uploader = require('../../utilities/singleUploader')


function avatarUplaod(req,res,next){
    const upload  = uploader(
        "avatars",
        ['image/jpeg',"image/jpg",'image/png'],
        100000,
        'only jpeg jpg png picture are allowed'
    );

    //call the middleware function 

    upload.any()(req,res,(error)=>{
        if(error){
            res.status(500).json({
                errors:{
                    avatar:error.message
                }
            })
        }else{
            next();
        }
    })

    
}

module.exports = avatarUplaod;

