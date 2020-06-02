import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';

import Signup from './component/auth/Signup';
import './App.css';
import Navbar from './component/Navbar';
import Login from './component/auth/Login';

import Dashboard from './component/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import { loaduser } from './actions/auth';

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
				<section>
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
