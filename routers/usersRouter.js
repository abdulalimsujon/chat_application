
//external imports
const express = require('express');

const router = express.Router();

//internal imports
const {getUsers, addUsers} = require('../controllers/usersControllers')
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const avatarUplaod = require('../middlewares/users/avatarUpload')
const {addUserValidators,addUserValidationHandler}  =  require('../middlewares/users/usersValidator')



//user page
router.get('/',decorateHtmlResponse('users'),getUsers);

//add user

router.post('/',
avatarUplaod,
addUserValidators,
addUserValidationHandler,
addUsers
)

module.exports = router;