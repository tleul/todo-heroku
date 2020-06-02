import API from '../api/api';

import {
	LOGINSUCCESS,
	LOGINFAIL,
	REGISTERFAIL,
	REGISTERSUCCESS,
	LOADUSER,
	LOGOUT,
} from './types';
export const loaduser = () => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.token,
		},
	};

	try {
		const res = await API.get('/api/signin', config);
		dispatch({
			type: LOADUSER,
			payload: localStorage.token,
			userData: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('no user found');
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

		const res = await API.post('/api/signin', body, config);
		const token = res.data.token;
		console.log(token);
		const getConfig = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
		};
		const userData = await API.get('/api/signin', getConfig);

		dispatch({
			type: LOGINSUCCESS,
			payload: res.data,
			userData: userData,
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

		const res = await API.post('/api/register', body, config);
		console.log(res);
		dispatch({
			type: REGISTERSUCCESS,
			payload: res.data,
		});
		dispatch(loaduser());
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
};
