import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="absolute"
      color="primary"
      sx={{ boxShadow: "none" }} // Remove the box shadow
    >
      <Toolbar>
        <Box sx={{ flex: "1 1 0px", textAlign: "left" }}>
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
        <Box sx={{ flex: "1 1 0px", textAlign: "center" }}>
          <Typography variant="h6">AI-tinerary</Typography>
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
            <Box sx={{ flex: "1 1 0px" }}>
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
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id="profile-menu"
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{ mt: 5 }}
        >
          {isSignedIn ? (
            <Box>
              <MenuItem
                onClick={() => {
                  navigate(`/profile`);
                  handleMenuClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Box>
          ) : (
            <MenuItem
              onClick={() => {
                navigate("/login");
                handleMenuClose();
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
