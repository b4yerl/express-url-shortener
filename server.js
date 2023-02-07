const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.js');

// Load .env files
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// Start express app
const app = express();

// Setup body parser
app.use(express.json());

// morgan logger setup
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
};

// Route files
const shortener = require('./routes/urls');
const clicks = require('./routes/clicks')
// ROUTES
app.use('/api/v1/shortener', shortener);
app.use('/api/v1/clicks', clicks);

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

