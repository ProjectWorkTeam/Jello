import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

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
      } else {
        closeModal();
      }
    }
  };

  const demo = async () => {
    const data = await dispatch(login('demo@lit.com', 'demopass'))
    if (data) {
      setErrors(data);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="login-form-modal">
      <div className="login-modal-background" onClick={handleBackgroundClick} >
      <div className="login-modal-content" onClick={handleModalClick}>
      <h1 className="login-form-title">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="login-form-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="login-form-input-group">
          <label className="login-form-label">
            Email
            <input
              className="login-form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="login-form-input-group">
          <label className="login-form-label">
            Password
            <input
              className="login-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="login-form-button" type="submit">Log In</button>
      </form>
      <div className="login-form-demo-wrapper">
        <button className="login-form-demo-button" onClick={demo}>
          Demo User
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
