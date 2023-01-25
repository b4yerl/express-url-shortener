const Url = require('../models/Url')
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
// @desc Shortens a single URL
// @routes POST /api/v1/shortener
// @access Public
exports.shortenUrl = asyncHandler (async (req, res, next) => {
  const newUrl = await Url.create({ originalUrl: req.body.url });
  const shortUrl = req.protocol + '://' + req.headers.host + req.originalUrl + '/' + newUrl.shortUrl;
  
  res.status(201).json({ success: true, originalUrl: newUrl.originalUrl, shortUrl: shortUrl })
});

// @desc Redirects the user and updates the clicks counter
// @routes GET /api/v1/shortener/:shortUrl
// @access Public
exports.redirectUrl = asyncHandler( async (req, res, next) => {
  console.log(req.params.shortUrl)
  const document = await Url.findOneAndUpdate(
    { shortUrl: req.params.shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  if(!document) return next(new ErrorResponse('URL not found', 404));
  res.status(301).redirect(document.originalUrl);
});