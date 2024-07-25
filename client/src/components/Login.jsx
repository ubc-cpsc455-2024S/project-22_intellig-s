import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(login({ username, password }));
    if (error) {
      console.error("Error logging in", error);
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ marginTop: "64px" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <p>{error.message}</p>}
      </form>
      <button onClick={() => navigate("/signup")}>
        Don't have an account? Sign up!
      </button>
    </div>
  );
};

export default Login;
