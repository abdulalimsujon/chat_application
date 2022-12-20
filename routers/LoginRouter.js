const express = require('express');

const router = express.Router();



const {getLogin, login} = require('../controllers/LoginController')
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { doLoginValidator, doLoginValidatorHandler } = require('../middlewares/login/loginValidator');

router.get('/',decorateHtmlResponse("login"),getLogin);



//process login
router.post('/',
decorateHtmlResponse('Login'),
doLoginValidator,
doLoginValidatorHandler,login);

module.exports = router;