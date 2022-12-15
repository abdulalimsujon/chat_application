const express = require('express');

const router = express.Router();



const {getLogin} = require('../controllers/LoginController')
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
router.get('/',decorateHtmlResponse("login"),getLogin);

module.exports = router;