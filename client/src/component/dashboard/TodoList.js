import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import '../../tabel.css';
import { connect } from 'react-redux';
import { gettodo } from '../../actions/todoaction';
import { Redirect } from 'react-router-dom';
import { deleteTodo } from './../../actions/todoaction';
const TodoList = ({ loading, todoList, gettodo, deleteTodo }) => {
	useEffect(() => {
		gettodo();
	}, []);

	const todoTabel =
		loading &&
		todoList.map((data) => (
			<tr key={data._id} className='raw'>
				<td>{data.todotitle}</td>
				<td>{data.todotext}</td>
				<td>
					<Moment format='D MMM YYYY'>{data.createdDate}</Moment>
				</td>
				<td>
					<Moment format='D MMM YYYY'>{data.dueDate}</Moment>
				</td>
				<td>{moment(data.dueDate).from(data.createdDate)}</td>
				<td>
					{' '}
					<button
						onClick={(e) => deleteTodo(data._id)}
						className='table-btn'>
						{'    '}Delete
					</button>
				</td>
			</tr>
		));
	return (
		<Fragment>
			<table role='table'>
				<thead role='rowgroup'>
					<tr role='row'>
						<td role='columnheader'>
							<strong>Todo Title </strong>
						</td>

						<td role='columnheader'>
							<strong>Todo Discription </strong>
						</td>
						<td role='columnheader'>
							<strong>Date created </strong>
						</td>
						<td role='columnheader'>
							<strong>Due Date </strong>
						</td>
						<td role='columnheader'>
							<strong>Expires On</strong>
						</td>
					</tr>
				</thead>
				<tbody role='rowgroup'>{todoTabel}</tbody>
			</table>
		</Fragment>
	);
};

TodoList.propTypes = {
	todoList: PropTypes.array,
	loading: PropTypes.bool.isRequired,
	gettodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	todoList: state.todo.todoList,
	loading: state.todo.loading,
});
export default connect(mapStateToProps, { gettodo, deleteTodo })(TodoList);
