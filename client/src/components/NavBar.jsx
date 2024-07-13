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
import { signOut } from "../redux/authSlice";

const NavBar = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
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
      position="static"
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
        <div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id="profile-menu"
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {!isSignedIn && (
              <MenuItem
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </MenuItem>
            )}
            {isSignedIn && (
              <MenuItem
                onClick={() => {
                  dispatch(signOut());
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
