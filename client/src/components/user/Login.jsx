import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getItinerariesAsync } from "../../redux/itinerarySlice";

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
      )
        .unwrap()
        .then(() => dispatch(getItinerariesAsync()));
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
      <Container sx={{ pt: 6 }} maxWidth={"xs"}>
        <Card
          variant="outlined"
          sx={{ width: "100%", px: { xs: 3, sm: 4 }, py: 5 }}
        >
          <Typography
            sx={{
              typography: {
                fontWeight: 900,
                xs: { fontSize: 30 },
                sm: { fontSize: 45 },
              },
              mb: 4,
            }}
          >
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
      </Container>
    </Box>
  );
};

export default Login;
