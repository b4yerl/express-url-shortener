const { Prisma } = require('@prisma/client');
const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Validation Error
  if(err instanceof Prisma.PrismaClientValidationError) {
    const message = 'An error ocorred while shortening your URL, please try again'
    error = new ErrorResponse(message, 500);
    res.status(error.statusCode).json({ success: false, data: message })
  }
  
  // Default error
  res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server error' });
};

module.exports = errorHandler;