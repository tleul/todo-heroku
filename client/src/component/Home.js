import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
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

export default Home;
