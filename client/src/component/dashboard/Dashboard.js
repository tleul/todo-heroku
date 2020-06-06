import React, { Fragment, useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { gettodo, addtodo } from '../../actions/todoaction';

import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const Dashboard = ({
	gettodo,
	todo,

	loading,
	isAuthenticated,
}) => {
	useEffect(() => {
		gettodo();
	}, []);
	if (!isAuthenticated) {
		return <Redirect to='/' />;
	}
	console.log(todo);
	return (
		<Fragment>
			<section className='container'>
				<div className='box'>
					<TodoForm />
				</div>
				<div className='side-todo'>
					{' '}
					<TodoList />
				</div>
			</section>
		</Fragment>
	);
};
Dashboard.propType = {
	gettodo: PropTypes.func.isRequired,
	addtodo: PropTypes.func.isRequired,
	user: PropTypes.object,
	todo: PropTypes.array,
	loading: PropTypes.bool,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	loading: state.todo.loading,
	user: state.auth.user,
	todo: state.todo.todo,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { gettodo, addtodo })(Dashboard);
