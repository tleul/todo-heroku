import React from 'react';

import { Link, Redirect } from 'react-router-dom';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
const Home = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<p className='lead' style={{ color: '#fff' }}>
						Start creating your To Do
					</p>
					<div className='button'>
						<Link to='register' className='btn btn-primary'>
							Signup
						</Link>{' '}
						<br />
						<br />
						<Link to='login' className='btn btn'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
Home.propTypes = {
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {})(Home);
