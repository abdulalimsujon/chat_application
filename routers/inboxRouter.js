const express = require('express');

const router = express.Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const {getInbox} = require('../controllers/inboxContoller');
const { redirectLoggedIn, checkLogin } = require('../middlewares/common/checkLogin');

router.get('/',decorateHtmlResponse('inbox'),checkLogin,getInbox);

module.exports = router;