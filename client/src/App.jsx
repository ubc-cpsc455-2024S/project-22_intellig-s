import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchUser } from "./redux/authSlice";
import { getItinerariesAsync } from "./redux/itinerarySlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import MyItineraries from "./pages/MyItineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import UserProfile from "./pages/UserProfile";

import theme from "./theme";
import "./App.css";

import { jwtDecode } from "jwt-decode";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!user) {
      const oldToken = localStorage.getItem("token");
      if (oldToken) {
        dispatch(fetchUser(oldToken))
          .unwrap()
          .then(() => {
            if (token) {
              const decodedUser = jwtDecode(token);
              dispatch(getItinerariesAsync(decodedUser.id));
            }
          });
      }
    }
  }, [dispatch, token, user]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-itineraries" element={<MyItineraries />} />
            <Route path="/itineraries/:id" element={<ItineraryDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
