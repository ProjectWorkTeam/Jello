import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Contact from "../Contact/index"
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<header>
			<nav className='nav-container'>
				<ul className="nav-contents">
					<li className="home-link">
						<NavLink exact to="/">Jello</NavLink>
					</li>
					<li className='nav-contact'>
						<OpenModalButton
							className="contact-us"
							buttonText="Contact Us"
							modalComponent={<Contact />}
						/>
					</li>
					{isLoaded && (
						<li id="profile-wrapper">
							<ProfileButton user={sessionUser} />
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}


export default Navigation;
