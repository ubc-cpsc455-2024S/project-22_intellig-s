import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  if (user) navigate("/");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    dispatch(login({ username, password }));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        pt: "64px",
      }}
    >
      <Box
        sx={{
          pt: 2,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "330px",
        }}
      >
        <Typography variant={"h4"}>Login</Typography>
        <Typography sx={{ height: "2em" }} color={"red"}>
          {error && error.message}
        </Typography>

        <TextField
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button
          variant={"contained"}
          onClick={onSubmit}
          disabled={isLoading}
          sx={{ mb: 1 }}
        >
          Login
        </Button>
        <Button variant={"contained"} onClick={() => navigate("/signup")}>
          Don&#39;t have an account? Sign up!
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
