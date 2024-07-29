import { useState, useEffect } from "react";
import { signup } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonalizationForm from "./PersonalizationForm";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [showPersonalizationForm, setShowPersonalizationForm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowPersonalizationForm(true);
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    dispatch(signup({ username, password }));
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
          pt: 2,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "330px",
        }}
      >
        <Typography variant={"h3"} fontWeight={900}>
          Sign-up
        </Typography>
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
          Sign Up
        </Button>
      </Box>
      <PersonalizationForm
        open={showPersonalizationForm}
        handleClose={handleClosePersonalization}
      />
    </Box>
  );
};

export default Signup;
