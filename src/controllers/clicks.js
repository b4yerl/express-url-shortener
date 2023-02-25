const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { parse } = require('url')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// @desc   Get clicks count for a given link
// @routes GET /api/clicks/:shortUrl
// @access Public
exports.getClicks = asyncHandler( async (req, res, next) => {
  const document = await prisma.url.findUnique({
    where: { short_url: req.params.shortUrl }
  });

  if(!document) return next(new ErrorResponse('URL not found', 404));
  
  const originalUrl = parse(document.original_url)

  res.status(200).json({ success: true, data: {
    linksTo: originalUrl.hostname,
    clicks: document.clicks,
    createdAt: document.created_at.toDateString()
  }});
});