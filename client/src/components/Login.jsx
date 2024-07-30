import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

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
        <Typography variant={"h3"} fontWeight={900}>
          Login
        </Typography>
        <Typography sx={{ height: "2em" }} color={"red"}>
          {error && error.message}
        </Typography>

        <Grid container spacing={1}>
          <TextField
            type="text"
            name="username"
            label="Username"
            size="small"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button
            variant={"contained"}
            fullWidth
            onClick={onSubmit}
            disabled={isLoading}
            sx={{ mb: 1 }}
          >
            Login
          </Button>
          <Button
            variant={"contained"}
            fullWidth
            onClick={() => navigate("/signup")}
          >
            Don&#39;t have an account? Sign up!
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
