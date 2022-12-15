const express = require('express');

const router = express.Router();

const {getUsers} = require('../controllers/usersControllers')
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")


router.get('/',decorateHtmlResponse('users'),getUsers);

module.exports = router;