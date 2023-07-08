import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
	<div className='nav-container'>
		<ul className="nav-contents">
			<li className="home-link">
				<NavLink exact to="/">Jello</NavLink>
			</li>
			{isLoaded && (
				<li id="profile-wrapper">
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	</div>
	);
}

export default Navigation;
