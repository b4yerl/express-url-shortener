const mongoose = require('mongoose');
const generateShortUrl = require('../middleware/shortener');

const UrlSchema = new mongoose.Schema({
	originalUrl: { type: String, required: true },
  shortUrl: { type: String, unique: true },
	clicks: { type: Number, dafault: 0 }
});

UrlSchema.pre('save', async function(next) {
  while(true) {
    this.shortUrl = generateShortUrl();
    const searchResult = await Url.findOne({ shortUrl: this.shortUrl });
    if(!searchResult) {
      break;
    }
  }
  next();
})

module.exports = mongoose.model('Url', UrlSchema);