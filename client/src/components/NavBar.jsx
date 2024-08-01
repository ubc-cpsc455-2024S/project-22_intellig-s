import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button } from "@mui/material";

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
              component={Link}
              to="/"
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
              <HomeIcon sx={{ mr: 1 }} />
              Home
            </Button>
            {isSignedIn && (
              <Button
                variant="contained"
                aria-label="my itineraries"
                component={Link}
                to="/my-itineraries"
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
                <TravelExploreIcon sx={{ mr: 1 }} />
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
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={navAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={navAnchorEl ? true : false}
              onClose={handleNavMenuClose}
              sx={{ mt: 5 }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/`);
                  handleNavMenuClose();
                }}
              >
                Home
              </MenuItem>
              {isSignedIn ? (
                <MenuItem
                  onClick={() => {
                    navigate("/my-itineraries");
                    handleNavMenuClose();
                  }}
                >
                  My Itineraries
                </MenuItem>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate("/login");
                      handleNavMenuClose();
                    }}
                  >
                    Log in
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/signup");
                      handleNavMenuClose();
                    }}
                  >
                    Sign up
                  </MenuItem>
                </>
              )}
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
                <PersonIcon sx={{ color: "#3D52A0" }} fontSize="large" />
              </Avatar>
            </IconButton>
          ) : (
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
            <MenuItem
              onClick={() => {
                navigate("/login");
                handleProfileMenuClose();
              }}
            >
              Login
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
