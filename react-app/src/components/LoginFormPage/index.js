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
    const data = await dispatch(login('demo@lit.com', 'demopass'))
    if (data) {
      setErrors(data);
    }
  }

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
      <h1 className="input-title">Log In</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-group">
          {/* <label>Email</label> */}
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="inputs"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* <label>Password</label> */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="inputs"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="buttons" type="submit">Log In</button>
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
