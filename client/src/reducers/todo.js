import { GETTODO, CLEAR_TODO, DELETE_TODO } from './../actions/types';

const initialState = {
	todoList: [],
	loading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GETTODO:
			console.log(payload);
			return {
				todoList: payload,
				loading: true,
			};
		case DELETE_TODO:
			return {
				todoList: payload,
				loading: true,
			};
		case CLEAR_TODO:
			return {
				todoList: null,
				loading: false,
			};
		default:
			return state;
	}
}
