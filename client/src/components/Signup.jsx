import { useState, useEffect } from "react";
import { signup } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonalizationForm from "./PersonalizationForm";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, usernameConflict, emailConflict, error } =
    useSelector((state) => state.auth);
  const [showPersonalizationForm, setShowPersonalizationForm] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      setShowPersonalizationForm(true);
    }
  }, [user]);

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let errorMessages = {};

    const emailValidatorRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordValidatorRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    if (formValues.firstName === "")
      errorMessages.firstName = "First name cannot be blank";

    if (formValues.lastName === "")
      errorMessages.lastName = "Last name cannot be blank";

    if (formValues.email === "") errorMessages.email = "Email cannot be blank";
    else if (!emailValidatorRegex.test(formValues.email))
      errorMessages.email = "Please enter a valid email";

    if (formValues.username === "")
      errorMessages.username = "Username cannot be blank";

    if (formValues.password === "")
      errorMessages.password = "Password cannot be blank";
    else if (!passwordValidatorRegex.test(formValues.password))
      errorMessages.password = (
        <Box>
          <Typography variant="p">Please enter a valid password: </Typography>
          <List sx={{ pl: 5, listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item" }}>
              Minimum of 8 characters
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              At least one upper case letter
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              At least one lower case letter
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              At least one number
            </ListItem>
          </List>
        </Box>
      );
    setFormErrors(errorMessages);
    return !Object.keys(errorMessages).length;
  };

  const onSubmit = () => {
    if (validateForm()) dispatch(signup(formValues));
  };

  const handleClosePersonalization = () => {
    setShowPersonalizationForm(false);
    navigate("/");
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
            Sign-up
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                size="small"
                fullWidth
                onChange={handleChange}
                error={formErrors.firstName ? true : false}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                size="small"
                fullWidth
                onChange={handleChange}
                error={formErrors.lastName ? true : false}
                helperText={formErrors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="email"
                label="Email"
                size="small"
                fullWidth
                onChange={handleChange}
                error={emailConflict || formErrors.email ? true : false}
                helperText={
                  emailConflict ? "Email is already in use" : formErrors.email
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="username"
                label="Username"
                size="small"
                fullWidth
                onChange={handleChange}
                error={usernameConflict || formErrors.username ? true : false}
                helperText={
                  usernameConflict
                    ? "Username is already in use"
                    : formErrors.username
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password"
                label="Password"
                size="small"
                fullWidth
                onChange={handleChange}
                error={formErrors.password ? true : false}
                helperText={formErrors.password}
                FormHelperTextProps={{ component: "span" }}
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
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={"outlined"}
                fullWidth
                onClick={() => navigate("/login")}
              >
                Already have an account? Log in!
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <PersonalizationForm
        open={showPersonalizationForm}
        handleClose={handleClosePersonalization}
      />
    </Box>
  );
};

export default Signup;
