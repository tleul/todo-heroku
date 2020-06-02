import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../actions/auth';
const Navbar = ({ userData, isAuthenticated, logout }) => {
	const userPage = (
		<ul>
			<li>
				<Link to='/register'>Signup</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	const guestPage = (
		<ul>
			<li>
				<Link onClick={logout} to='/'>
					Logout
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-house-user'></i>Welcome{' '}
					{isAuthenticated ? userData.name : ''}
				</Link>
			</h1>
			<ul>
				<li>{!isAuthenticated ? userPage : guestPage}</li>
			</ul>
		</nav>
	);
};
Navbar.propTypes = {
	userData: PropTypes.object,
	isAuthenticated: PropTypes.bool,
	logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	userData: state.auth.userData,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
