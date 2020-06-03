import React, { Fragment, useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { gettodo, addtodo } from './../actions/todoaction';

import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';

import TodoList from './TodoList';
const Dashboard = ({
	loading,
	gettodo,
	todo,
	user,
	addtodo,
	isAuthenticated,
}) => {
	const [displayTodo, toggleTodo] = useState(true);
	const [todoForm, setTodoform] = useState({
		todotext: '',
		todotitle: '',
	});
	const [startDate, setStartDate] = useState({
		dueDate: new Date(),
	});
	const { todotext, todotitle } = todoForm;
	const { dueDate } = startDate;

	const onChange = (e) =>
		setTodoform({ ...todoForm, [e.target.name]: e.target.value });
	const handelChange = (date) => {
		setStartDate({ dueDate: date });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		addtodo({ todotitle, todotext, dueDate });
	};

	useEffect(() => {
		gettodo();
	}, [gettodo]);

	const createToDo = (
		<Fragment>
			<section className='landing'>
				<div className='landing-inner'>
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<input
							type='submit'
							value='show my TODO'
							onClick={(e) => toggleTodo(!displayTodo)}
							className='btn'
						/>
						<p style={{ color: 'blue' }} className='lead'>
							You Have {loading && todo ? todo.todo.length : 'No'}{' '}
							Todo
						</p>
						<div className='form-group'>
							<input
								type='text'
								placeholder='Name Your TODO'
								name='todotitle'
								value={todotitle}
								onChange={(e) => onChange(e)}
							/>
							<small className='form-text'>
								Naming your todo will help you to recognise each
								todo
							</small>
						</div>
						<div className='form-group'>
							<input
								type='text'
								placeholder='TODO Discription '
								value={todotext}
								onChange={(e) => onChange(e)}
								name='todotext'
							/>
							<small className='form-text'>
								Discribe in good way, help you not to miss
								nothing
							</small>
						</div>
						<div className='datePicker'>
							{' '}
							<DatePicker
								selected={startDate.dueDate}
								onChange={(date) => handelChange(date)}
							/>
							<small className='form-text'>
								When do you want to complete(i will give you a
								heads up)
							</small>
						</div>
						<input type='submit' className='btn' />
					</form>
				</div>
			</section>
		</Fragment>
	);
	if (!isAuthenticated) {
		return <Redirect to='/' />;
	}

	return (
		loading && (
			<Fragment>
				<Fragment>{displayTodo ? createToDo : <TodoList />}</Fragment>
			</Fragment>
		)
	);
};
Dashboard.propType = {
	gettodo: PropTypes.func.isRequired,
	addtodo: PropTypes.func.isRequired,
	todo: PropTypes.object,
	loading: PropTypes.bool,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	loading: state.todo.loading,
	todo: state.todo.todo,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { gettodo, addtodo })(Dashboard);
