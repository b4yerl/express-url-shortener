const mongoose = require('mongoose');
const generateShortUrl = require('../middleware/randomBytes');

const UrlSchema = new mongoose.Schema({
	originalUrl: { 
    type: String,
    required: true,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ] 
  },
  shortUrl: {
    type: String,
    unique: true
  },
	clicks: {
    type: Number,
    default: 0
  }
});

UrlSchema.pre('save', function(next) {
  this.shortUrl = generateShortUrl();
  next();
});
 
module.exports = mongoose.model('Url', UrlSchema);