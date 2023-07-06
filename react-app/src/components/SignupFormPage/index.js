import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import jello from "../../assets/Jello.jpg";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
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
            {/* Email */}
            <input
              type="text"
              value={email}
              placeholder="Email"
              className="inputs"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Username"
              className="inputs"
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="Password"
              className="inputs"
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
    </div>
  );
}

export default SignupFormPage;
