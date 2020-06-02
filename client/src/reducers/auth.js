import {
	LOGINSUCCESS,
	LOGINFAIL,
	REGISTERSUCCESS,
	REGISTERFAIL,
	LOADUSER,
	LOGOUT,
} from './../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	userData: null,
};

export default function (state = initialState, action) {
	const { type, payload, userData } = action;
	switch (type) {
		case LOGINSUCCESS:
		case REGISTERSUCCESS:
			localStorage.setItem('token', payload.token);
			console.log(payload);
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				userData: userData,
			};
		case LOGINFAIL:
		case REGISTERFAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				user: payload,
			};
		case LOADUSER:
			return {
				...state,
				isAuthenticated: true,
				userData: userData,
			};

		default:
			return state;
	}
}
