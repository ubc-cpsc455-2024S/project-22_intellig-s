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
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";

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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          component={Link}
          to="/"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AI-tinerary
        </Typography>
        {isSignedIn && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="my itineraries"
            component={Link}
            to="/my-itineraries"
          >
            <TravelExploreIcon />
          </IconButton>
        )}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {isSignedIn ? (
            <Avatar
              sx={{ bgcolor: "white" }}
              alt={user.username}
              src={`${import.meta.env.VITE_BACKEND_URL}/auth/image/${
                user.imageId
              }`}
            >
              <PersonIcon sx={{ color: "#3D52A0" }} fontSize="large" />
            </Avatar>
          ) : (
            <Avatar>
              <QuestionMarkIcon />
            </Avatar>
          )}
        </IconButton>
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
