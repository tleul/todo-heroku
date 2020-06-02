import React, { Fragment, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { addtodo } from './../actions/todoaction';

import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loaduser } from './../actions/auth';
const Dashboard = ({ loading, addtodo, isAuthenticated, data }) => {
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

	const createToDo = (
		<Fragment>
			<h1>Heloo</h1>
			<h1> </h1>
			<div>
				<br />
				<br />
				<br />
				<p></p>

				<form className='form' onSubmit={(e) => onSubmit(e)}>
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
							Discribe in good way, help you not to miss nothing
						</small>
					</div>
					<div className='form-group'>
						<DatePicker
							selected={startDate.dueDate}
							onChange={(date) => handelChange(date)}
						/>
						<small className='form-text'>
							When do you want to complete(i will give you a heads
							up)
						</small>
					</div>
					<input type='submit' className='btn btn-primary my-1' />
				</form>
			</div>
		</Fragment>
	);

	return (
		loading && (
			<Fragment>
				<section style={{ alignContent: 'center' }} className='landing'>
					<div className='dark-overlay'>
						<div className='landing-inner'>
							<br />
							<br />
							<br />
							<Fragment>{createToDo}</Fragment>
							{/* {props.state.isAut ? (
						<Fragment>
							<p className='lead' style={{ color: '#fff' }}>
								'here is your list'
							</p>
						</Fragment>
					) : (
						createToDo
					)} */}
						</div>
					</div>
				</section>
			</Fragment>
		)
	);
};
Dashboard.propType = {
	Dashboard: PropTypes.func.isRequired,
	data: PropTypes.object,
	loading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	data: state.auth.user,
	loading: state.auth.loading,
});
export default connect(mapStateToProps, { addtodo })(Dashboard);
