const express = require('express');
const { urlShortener } = require('../controllers/urls')

const router = express.Router();

router.route('/')
      .post(urlShortener);


module.exports = router;
