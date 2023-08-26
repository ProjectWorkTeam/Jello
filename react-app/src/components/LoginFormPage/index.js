import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";

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

    // Validation checks
    const validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(Object.values(validationErrors));
    } else {
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const demo = async () => {
    const data = await dispatch(login('demo@lit.com', 'demopass'))
    if (data) {
      setErrors(data);
    }
  };

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <div className="login-container">
      <div className="top">
        <div className="login-signup-Title" onClick={handleLogoClick}>
          Jello
        </div>
      </div>
      <h1 className="login-input-title">Log In</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="login-form-group">
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="inputs"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="inputs"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="buttons" type="submit">
          Log In
        </button>
      </form>
      <div className="demo-wrapper">
        <button className="buttons" onClick={demo}>
          Demo User
        </button>
      </div>
    </div>
  );
}

export default LoginFormPage;
