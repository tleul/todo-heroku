import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/layout/Home';

import Signup from './component/auth/Signup';
import './App.css';
import Navbar from './component/layout/Navbar';
import Login from './component/auth/Login';

import Dashboard from './component/dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import { loaduser } from './actions/auth';
import setauthToken from './api/setToken';
import { gettodo } from './actions/todoaction';

if (localStorage.token) {
	setauthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			store.dispatch(loaduser());
		}
	});
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Route exact path='/' component={Home} />
				<section className='container'>
					<Switch>
						<Route exact path='/register' component={Signup} />
						<Route exact path='/Login' component={Login} />
						<Route exact path='/dashboard' component={Dashboard} />
					</Switch>
				</section>
			</Router>
		</Provider>
	);
};
export default App;
