import { GETTODO, CLEAR_TODO } from './../actions/types';

const initialState = {
	todo: [],
	loading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GETTODO:
			console.log(payload);
			return {
				todo: payload.data,
				loading: true,
			};
		case CLEAR_TODO:
			return {
				todo: null,
				loading: false,
			};
		default:
			return state;
	}
}
