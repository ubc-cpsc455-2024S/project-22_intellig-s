import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing up", error);
      });
  };

  return (
    <div>
      <h2>Sign-up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
