import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/auth/signin`, { username, password })
      .then((response) => {
        dispatch(signIn());
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/signup")}>
        Don't have an account? Sign up!
      </button>
    </div>
  );
};

export default Login;
