import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    dispatch(signup({ username: username, password: password }));
    if (error) {
      console.error("Error logging in", error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Sign-up</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
