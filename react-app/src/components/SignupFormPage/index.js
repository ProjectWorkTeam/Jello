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
  const [errors, setErrors] = useState({});
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate email
    if (!/.+@.+\..+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    // Validate username
    if (username.length < 4) {
      validationErrors.username = "Username must be at least 4 characters";
    }

    // Validate first name
    if (firstName.trim() === "") {
      validationErrors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      validationErrors.firstName = "First Name must be alphabetic";
    }

    // Validate last name
    if (lastName.trim() === "") {
      validationErrors.lastName = "Last Name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      validationErrors.lastName = "Last Name must be alphabetic";
    }

    // Validate password
    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password field must match Password field";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
    <div className="signup-container">
      <div className="login-title-container">
      <div className="signup-Title" onClick={handleLogoClick}>
        Jello
      </div>
      <h1 className="login-input-title">Sign Up</h1>
      </div>
      <h2 className="title">Sign up for your account</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        {Object.keys(errors).length > 0 && (
          <ul className="error-list">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <div className="signup-form-group">
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
        <div className="signup-form-group">
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
        <div className="signup-form-group">
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
        <div className="signup-form-group">
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
        <div className="signup-form-group">
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
        <div className="signup-form-group">
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
    </div>
  );
}

export default SignupFormPage;
