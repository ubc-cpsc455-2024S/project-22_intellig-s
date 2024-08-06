import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Home, MenuSharp, Person, TravelExplore } from "@mui/icons-material";

import { logout } from "../redux/authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const isSignedIn = user != null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navAnchorEl, setNavAnchorEl] = React.useState(null);
  const handleNavMenuOpen = (event) => {
    setNavAnchorEl(event.currentTarget);
  };
  const handleNavMenuClose = () => {
    setNavAnchorEl(null);
  };

  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <AppBar
      position="absolute"
      color="primary"
      sx={{ boxShadow: "none" }} // Remove the box shadow
    >
      <Toolbar sx={{ height: "64px" }}>
        <Box sx={{ flex: "1 1 0px", textAlign: "left" }}>
          <Box display={{ xs: "none", md: "block" }}>
            <Button
              variant="contained"
              aria-label="home"
              onClick={() => navigate("/")}
              sx={{
                pl: 1.75,
                mr: 1,
                backgroundColor: "white",
                border: "1px solid white",
                color: "primary.main",
                ":hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              <Home sx={{ mr: 1 }} />
              Home
            </Button>
            {isSignedIn && (
              <Button
                variant="contained"
                aria-label="my itineraries"
                onClick={() => navigate("/my-itineraries")}
                sx={{
                  pl: 1.75,
                  border: "1px solid white",
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "primary.main",
                    border: "1px solid white",
                  },
                }}
              >
                <TravelExplore sx={{ mr: 1 }} />
                My Itineraries
              </Button>
            )}
          </Box>
          <Box display={{ xs: "block", md: "none" }}>
            <IconButton
              sx={{ color: "white" }}
              onClick={handleNavMenuOpen}
              edge="start"
            >
              <MenuSharp />
            </IconButton>
            <Menu
              anchorEl={navAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={navAnchorEl ? true : false}
              onClose={handleNavMenuClose}
              sx={{ mt: 5 }}
            >
              <Box>
                <MenuItem
                  onClick={() => {
                    navigate(`/`);
                    handleNavMenuClose();
                  }}
                >
                  Home
                </MenuItem>
                {isSignedIn && (
                  <MenuItem
                    onClick={() => {
                      navigate("/my-itineraries");
                      handleNavMenuClose();
                    }}
                  >
                    My Itineraries
                  </MenuItem>
                )}
              </Box>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 0px", textAlign: "center" }}>
          <Typography
            sx={{
              typography: {
                xs: { fontSize: "15px" },
                md: { fontSize: "20px" },
              },
            }}
          >
            AI-tinerary
          </Typography>
        </Box>
        <Box sx={{ flex: "1 1 0px", textAlign: "right" }}>
          {isSignedIn ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ flex: "1 1 0px" }}
            >
              <Avatar
                sx={{ bgcolor: "white" }}
                alt={user.username}
                src={
                  user.imageId
                    ? `${import.meta.env.VITE_BACKEND_URL}/auth/image/${
                        user.imageId
                      }`
                    : null
                }
              >
                <Person sx={{ color: "#3D52A0" }} fontSize="large" />
              </Avatar>
            </IconButton>
          ) : (
            <>
              <Box display={{ xs: "none", md: "block" }}>
                <Button
                  variant="contained"
                  sx={{
                    mr: 1,
                    backgroundColor: "white",
                    border: "1px solid white",
                    color: "primary.main",
                    ":hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    border: "1px solid white",
                    color: "white",
                    ":hover": {
                      backgroundColor: "white",
                      color: "primary.main",
                      border: "1px solid white",
                    },
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Box>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ flex: "1 1 0px", display: { xs: "flex", md: "none" } }}
              >
                <Avatar sx={{ bgcolor: "white", height: 30, width: 30 }}>
                  <Person sx={{ color: "#3D52A0" }} fontSize="medium" />
                </Avatar>
              </IconButton>
            </>
          )}
        </Box>

        <Menu
          anchorEl={profileAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id="profile-menu"
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={profileAnchorEl ? true : false}
          onClose={handleProfileMenuClose}
          sx={{ mt: 5 }}
        >
          {isSignedIn ? (
            <Box>
              <MenuItem
                onClick={() => {
                  navigate(`/profile`);
                  handleProfileMenuClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  handleProfileMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Box>
          ) : (
            <Box>
              <MenuItem
                onClick={() => {
                  navigate("/login");
                  handleProfileMenuClose();
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/signup");
                  handleProfileMenuClose();
                }}
              >
                Signup
              </MenuItem>
            </Box>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
