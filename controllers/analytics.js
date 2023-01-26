const Url = require('../models/Url')
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { parse } = require('url')

// @desc
// @routes
// @access
exports.getClicks = asyncHandler( async (req, res, next) => {
  const document = await Url.findOne({ shortUrl: req.params.shortUrl });

  if(!document) return next(new ErrorResponse('URL not found', 404));

  const originalUrl = parse(document.originalUrl)

  res.status(200).json({ success: true, data: { linksTo: originalUrl.hostname, clicks: document.clicks } });
});