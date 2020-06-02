const express = require('express');
const config = require('./config/config');
const dbConnect = require('./config/db');

// import data from './data.json';

// import UserSchema from '../model/User';
const app = express();

app.use(express.static('public'));

dbConnect();
app.use(express.json({ extended: false }));
//Test
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, x-auth-token',
	);
	next();
});
app.get('/', (req, res) => {
	res.send('Connected');
});

app.use('/api/register', require('./router/register'));
app.use('/api/signin', require('./router/auth'));
app.use('/api/addtodo', require('./router/addtodo'));

//Step 3
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.listen(
	config.port,
	console.log(' ---Server  $$ connected--- ' + config.port),
);
