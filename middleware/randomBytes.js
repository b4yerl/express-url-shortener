const crypto = require('crypto');

function generateShortUrl() {
  return crypto.randomBytes(3).toString('hex');
}

module.exports = generateShortUrl;