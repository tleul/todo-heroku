import API from '../api/api';

import { GETTODO } from './types';
export const addtodo = ({ todotitle, todotext, dueDate }) => async (
	dispatch,
) => {
	try {
		const body = JSON.stringify({ todotitle, todotext, dueDate });

		const res = await API.post('/addtodo', body);
		console.log(res);
		dispatch({
			type: GETTODO,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};
export const gettodo = () => async (dispatch) => {
	try {
		const res = await API.get('/addtodo');

		dispatch({
			type: GETTODO,
			payload: res.data,
		});
	} catch (error) {
		console.log('error');
	}
};
// export const deletetodo = ({ id }) => async (dispatch) => {
// 	try {
// 		const body = { todotitle, todotext, dueDate };
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};

// 		const res = await API.post('/api/addtodo', body, config);
// 		console.log(res);
// 		dispatch({
// 			type: TODO_SUCCESS,
// 			payload: res.data,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// export const updatetodo = ({ id }) => async (dispatch) => {
// 	try {
// 		const body = { todotitle, todotext, dueDate };
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};

// 		const res = await API.post('/api/addtodo', body, config);
// 		console.log(res);
// 		dispatch({
// 			type: TODO_SUCCESS,
// 			payload: res.data,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
