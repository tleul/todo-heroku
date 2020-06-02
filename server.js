const express = require('express');
const config = require('./config/config');
const dbConnect = require('./config/db');
const proxy = require('http-proxy-middleware');

const morgan = require('morgan');
const app = express();

dbConnect();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, x-auth-token',
	);
	next();
});

//Step 3
if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
app.use(morgan('tiny'));

// place in src with index.js no need to import anywhere

module.exports = function (app) {
	// add other server routes to path array
	app.use(proxy(['/api'], { target: 'http://localhost:5000' }));
};
app.use('/api/register', require('./router/register'));
app.use('/api/signin', require('./router/auth'));
app.use('/api/addtodo', require('./router/addtodo'));
app.listen(
	config.port,
	console.log(' ---Server  $$ connected--- ' + config.port),
);
