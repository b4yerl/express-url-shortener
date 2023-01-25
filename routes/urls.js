const express = require('express');
const { shortenUrl, redirectUrl } = require('../controllers/urls')

const router = express.Router();

router.route('/')
      .post(shortenUrl);

router.route('/:shortUrl')
      .get(redirectUrl)


module.exports = router;
