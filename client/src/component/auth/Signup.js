import React, { Fragment, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';
const Signup = (props) => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		phone: '',
	});

	const { name, email, phone } = userData;

	const onChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		props.register({ name, email, phone });
	};
	if (props.isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Fragment>
			<section className='form-section'>
				<p className='lead' style={{ color: 'white' }}>
					<i className='fas fa-user'></i> Create Your Todo Account
				</p>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							autoComplete='new-name'
							type='text'
							placeholder='Name'
							name='name'
							value={name}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
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
							placeholder='Phone'
							name='phone'
							minLength='10'
							value={phone}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<input
						type='submit'
						className='btn btn-primary'
						value='Register'
					/>
				</form>
				<p className='my-1'>
					Already have an account?{' '}
					<Link to='/login'>
						<span className='form-sign' style={{ color: 'white' }}>
							Sign In
						</span>
					</Link>
				</p>
			</section>
		</Fragment>
	);
};

register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Signup);
