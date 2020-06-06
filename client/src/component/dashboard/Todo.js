import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import '../../tabel.css';
import { connect } from 'react-redux';
import { gettodo } from '../../actions/todoaction';
import { Redirect } from 'react-router-dom';
const TodoList = ({ loading, todo, gettodo }) => {
	useEffect(() => {
		gettodo();
	}, []);

	const todoTabel =
		todo &&
		todo.map((data) => (
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
						onClick={(e) => console.log(data._id)}
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
	todo: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	gettodo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	todo: state.todo.todo,
	loading: state.todo.loading,
});
export default connect(mapStateToProps, { gettodo })(TodoList);
