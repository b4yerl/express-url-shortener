const Url = require('../models/Url')
const asyncHandler = require('../middleware/async');
// @desc
// @routes
// @access
exports.urlShortener = asyncHandler (async (req, res, next) => {
  const newUrl = await Url.create({ originalUrl: req.body.url });
  const shortUrl = req.protocol + '://' + req.headers.host + req.originalUrl + '/' + newUrl.shortUrl;
  
  res.status(201).json({ success: true, originalUrl: newUrl.originalUrl, shortUrl: shortUrl })
});