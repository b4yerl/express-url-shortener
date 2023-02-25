const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateShortUrl = async function() {
  let short, existingUrl;
  
  do {
    short = crypto.randomBytes(3).toString('hex');
    existingUrl = await prisma.url.findUnique({
      where: {
        short_url: short
      }
    });
  } while(existingUrl)

  return short;  
}

module.exports = generateShortUrl;