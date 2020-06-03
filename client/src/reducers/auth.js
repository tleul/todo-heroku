import {
	LOGINSUCCESS,
	LOGINFAIL,
	REGISTERSUCCESS,
	REGISTERFAIL,
	LOADUSER,
	LOGOUT,
	LOADUSER_FAIL,
} from './../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	loading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGINSUCCESS:
		case REGISTERSUCCESS:
			localStorage.setItem('token', payload.token);
			console.log(payload);
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: true,
			};
		case LOGINFAIL:
		case REGISTERFAIL:
		case LOGOUT:
		case LOADUSER_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				user: payload,
				loading: true,
			};
		case LOADUSER:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: true,
			};
		default:
			return state;
	}
}
