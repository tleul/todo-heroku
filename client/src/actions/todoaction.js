import API from '../api/api';

import { GETTODO, DELETE_TODO } from './types';
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
		console.log(res);
		dispatch({
			type: GETTODO,
			payload: res.data,
		});
	} catch (error) {
		console.log('error');
	}
};
export const deleteTodo = (id) => async (dispatch) => {
	try {
		console.log('react ID' + id);
		const res = await API.delete('/addtodo/id');
		console.log(res);
		dispatch({
			type: DELETE_TODO,
			payload: res.data,
		});
	} catch (error) {
		console.log('error');
	}
};
