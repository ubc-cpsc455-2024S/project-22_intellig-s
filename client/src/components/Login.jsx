import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let errorMessages = {};

    if (formValues.username === "")
      errorMessages.username = "Username cannot be blank";

    if (formValues.password === "")
      errorMessages.password = "Password cannot be blank";

    setFormErrors(errorMessages);
    return !Object.keys(errorMessages).length;
  };

  const onSubmit = () => {
    if (validateForm())
      dispatch(
        login({ username: formValues.username, password: formValues.password })
      );
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
                onChange={handleChange}
                fullWidth
                error={formErrors.username ? true : false}
                helperText={formErrors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password"
                label="Password"
                size="small"
                onChange={handleChange}
                fullWidth
                error={formErrors.password ? true : false}
                helperText={formErrors.password}
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
