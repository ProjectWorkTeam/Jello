import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import jello from "../../assets/Jello.jpg";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo = async () => {
    const data = await dispatch(login('demo@aa.io', 'password'))
    if (data) {
      setErrors(data);
    }
  }

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <div className="login-container">
      <div className="top">
        <div className="logo-container" onClick={handleLogoClick}>
          <div className="logo-wrapper">
            <img src={jello} alt="Jello" className="logo-image" />
          </div>
          <div className="logo-text">Jello</div>
        </div>
      </div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <button className="demo" onClick={demo}>
        Demo User
      </button>
    </div>
  );
}

export default LoginFormPage;
