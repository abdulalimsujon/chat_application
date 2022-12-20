const express = require('express');

const router = express.Router();



const {getLogin, login,logout} = require('../controllers/LoginController');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { doLoginValidator, doLoginValidatorHandler } = require('../middlewares/login/loginValidator');

router.get('/',decorateHtmlResponse("login"),redirectLoggedIn,getLogin);



//process login
router.post('/',
decorateHtmlResponse('Login'),
doLoginValidator,
doLoginValidatorHandler,login);


//logout

router.delete('/',logout);

module.exports = router;