const express = require('express');

const router = express.Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const {getInbox} = require('../controllers/inboxContoller')

router.get('/',decorateHtmlResponse('inbox') ,getInbox);

module.exports = router;