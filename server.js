const express = require('express');
const config = require('./config/config');
const dbConnect = require('./config/db');
const morgan = require('morgan');
const app = express();

dbConnect();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

//Step 3
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.use(morgan('tiny'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, x-auth-token',
	);
	next();
});
app.use('/api/register', require('./router/register'));
app.use('/api/signin', require('./router/auth'));
app.use('/api/addtodo', require('./router/addtodo'));
app.listen(
	config.port,
	console.log(' ---Server  $$ connected--- ' + config.port),
);
