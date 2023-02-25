const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error.js');

// Importing security middleware
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');

// Load .env files
dotenv.config({ path: './config/config.env' });

// Start express app
const app = express();

// Setup body parser
app.use(express.json());

// Preventing HTTP Parameter Pollution
app.use(hpp());

// Preventing XSS attacks
app.use(xss());

// Limiting users to 100 requests per 10 minutes
const tenMinutes = 10 * 60 * 1000
const limiter = rateLimit({
  windowMs: tenMinutes,
  max: 100
});

app.use(limiter);

// morgan logger setup
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
};

// Route files
const shortener = require('./routes/urls');
const clicks = require('./routes/clicks')
// ROUTES
app.use('/api/shortener', shortener);
app.use('/api/clicks', clicks);

// Error handler
app.use(errorHandler);

// Listen and handling unhandled promise rejections
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.green.inverse);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.stack}`)
	server.close(() => process.exit(1));
});

