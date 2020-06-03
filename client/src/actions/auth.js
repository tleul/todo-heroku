import API from '../api/api';

import {
	LOGINSUCCESS,
	LOGINFAIL,
	REGISTERFAIL,
	REGISTERSUCCESS,
	LOADUSER,
	LOGOUT,
	LOADUSER_FAIL,
	CLEAR_TODO,
} from './types';

import setauthToken from './../api/setToken';
export const loaduser = () => async (dispatch) => {
	if (localStorage.token) {
		setauthToken(localStorage.token);
	}
	try {
		const res = await API.get('/signin');
		dispatch({
			type: LOADUSER,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: LOADUSER_FAIL,
		});
	}
};
export const login = ({ email, password }) => async (dispatch) => {
	try {
		const body = JSON.stringify({ email, password });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await API.post('/signin', body, config);
		console.log(res.data);

		dispatch({
			type: LOGINSUCCESS,
			payload: res.data,
		});
		dispatch(loaduser());
	} catch (error) {
		console.log(error);
		dispatch({
			type: LOGINFAIL,
		});
	}
};
export const register = ({ name, email, phone }) => async (dispatch) => {
	try {
		const body = JSON.stringify({ name, email, phone });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await API.post('/register', body, config);

		dispatch({
			type: REGISTERSUCCESS,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: REGISTERFAIL,
		});
	}
};
export const logout = () => (dispatch) => {
	console.log('clicked');
	dispatch({
		type: LOGOUT,
	});
	dispatch({
		type: CLEAR_TODO,
	});
};
