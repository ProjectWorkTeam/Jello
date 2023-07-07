import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const validationErrors = {};
    if (firstName.trim() === "") {
      validationErrors.firstName = "First Name is required";
    }
    if (lastName.trim() === "") {
      validationErrors.lastName = "Last Name is required";
    }
    if (username.trim() === "") {
      validationErrors.username = "Username is required";
    }
    if (!/.+@.+\..+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword =
        "Confirm Password must match the Password field";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(Object.values(validationErrors));
    } else {
      const data = await dispatch(
        signUp(firstName, lastName, username, email, password)
      );
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        closeModal();
      }
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
