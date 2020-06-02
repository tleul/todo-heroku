const mongoose = require('mongoose');
const config = require('./config');

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || config.db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('--dbConnected');
	} catch (error) {
		console.log('Database error ' + error);
	}
};

module.exports = dbConnect;
