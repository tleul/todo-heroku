import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
const Login = ({ login, isAuthenticated, user }) => {
	const [authData, setAuthdata] = useState({
		email: '',
		password: '',
	});
	const { email, password } = authData;
	const onChange = (e) =>
		setAuthdata({ ...authData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(authData);
		login({ email, password });
	};
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Fragment>
			<section className='form-section'>
				<p className='lead' style={{ color: 'white' }}>
					<i className='fas fa-user'></i> Login to Your Account
				</p>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							autoComplete='new-email'
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => onChange(e)}
							name='email'
							required
						/>
					</div>

					<div className='form-group'>
						<input
							autoComplete='new-phone'
							type='number'
							placeholder='Pasword'
							name='password'
							minLength='4'
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input
						type='submit'
						className='btn btn-primary'
						value='Login'
					/>
				</form>
			</section>
		</Fragment>
	);
};
login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	user: PropTypes.object,
};
const mapStateToprops = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});
export default connect(mapStateToprops, { login })(Login);
