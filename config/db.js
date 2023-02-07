const mongoose = require('mongoose');
const colors = require('colors');
mongoose.set('strictQuery', false);

const connectDB = async () => {
	const connection = await mongoose.connect(process.env.MONGO_URI)
	console.log(`MongoDB connected: ${connection.connection.host}`.yellow.bold);
}

module.exports = connectDB;
