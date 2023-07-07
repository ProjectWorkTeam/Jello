import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import jello from "../../assets/Jello.jpg";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		// Validation checks
		const errors = {};
		if (!/.+@.+\..+/.test(email)) {
		  errors.email = "Invalid email format";
		}
		if (username.length < 4) {
		  errors.username = "Username must be at least 4 characters";
		}
		if (firstName === "") {
		  errors.firstName = "First Name is required";
		}
		if (lastName === "") {
		  errors.lastName = "Last Name is required";
		}
		if (password.length < 6) {
		  errors.password = "Password must be at least 6 characters";
		}
		if (password !== confirmPassword) {
		  errors.confirmPassword = "Confirm Password field must be the same as the Password field";
		}
		
		if (Object.keys(errors).length > 0) {
		  setErrors(Object.values(errors));
		} else {
		  const data = await dispatch(signUp(firstName, lastName, username, email, password));
		  if (data && data.errors) {
			setErrors(data.errors);
		  }
		}
	  };
	  

	const handleLogoClick = () => {
		history.push("/");
	};

	return (
		<div className="container">
			<div className="top">
				<div className="logo-container" onClick={handleLogoClick}>
					<div className="logo-wrapper">
						<img src={jello} alt="Jello" className="logo-image" />
					</div>
					<div className="logo-text">Jello</div>
				</div>
			</div>
			<h1 className="title">Sign up for your account</h1>
			<form onSubmit={handleSubmit} className="form-wrapper">
				<ul className="error-list">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="form-group">
					<label>
						{/* First Name */}
						<input
							type="text"
							value={firstName}
							className="inputs"
							placeholder="First Name"
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						{/* Last Name */}
						<input
							type="text"
							value={lastName}
							className="inputs"
							placeholder="Last Name"
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						{/* Username */}
						<input
							type="text"
							value={username}
							className="inputs"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						{/* Email */}
						<input
							type="text"
							value={email}
							className="inputs"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						{/* Password */}
						<input
							type="password"
							value={password}
							className="inputs"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						{/* Confirm Password */}
						<input
							type="password"
							value={confirmPassword}
							className="inputs"
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit" className="buttons">Sign Up</button>
			</form>
		</div >
	);
}

export default SignupFormPage;
