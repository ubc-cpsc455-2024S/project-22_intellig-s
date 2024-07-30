import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
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
          pt: 6,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "450px",
        }}
      >
        <Card variant="outlined" sx={{ width: "100%", px: 7, py: 5 }}>
          <Typography variant={"h3"} fontWeight={900} sx={{ mb: 4 }}>
            Login
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="username"
                label="Username"
                size="small"
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password"
                label="Password"
                size="small"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color={"error"}>{error.message}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant={"contained"}
                fullWidth
                onClick={onSubmit}
                disabled={isLoading}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={"outlined"}
                fullWidth
                onClick={() => navigate("/signup")}
              >
                Don&#39;t have an account? Sign up!
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
