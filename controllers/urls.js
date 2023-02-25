const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const generateShortUrl = require('../utils/ShortUrlGenerator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// @desc   Shortens a single URL
// @routes POST /api/shortener
// @access Public
exports.shortenUrl = asyncHandler (async (req, res, next) => {
  const validationRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if(!validationRegex.test(req.body.url)) {
    return next(new ErrorResponse('Please insert a valid http or https URL', 400));
  }

  const short = await generateShortUrl();
  //const newUrl = await Url.create({ originalUrl: req.body.url });
  const newItem = await prisma.url.create({
    data: {
      original_url: req.body.url,
      short_url: short
    }
  });

  const fullShortUrl = req.protocol + '://' + req.headers.host + req.originalUrl + '/' + newItem.short_url;
  
  res.status(201).json({ success: true, originalUrl: newItem.original_url, shortUrl: fullShortUrl })
});
