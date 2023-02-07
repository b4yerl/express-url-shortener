const express = require('express');
const { getClicks } = require('../controllers/clicks')

const router = express.Router();

router.route('/:shortUrl')
      .get(getClicks)


module.exports = router;
