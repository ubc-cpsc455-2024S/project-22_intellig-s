import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchUser } from "./redux/authSlice";
import {
  getExploreItineraries,
  getItinerariesAsync,
} from "./redux/itinerarySlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "./components/common/NavBar";
import Home from "./pages/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";

import MyItineraries from "./pages/MyItineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import UserProfile from "./pages/UserProfile";

import theme from "./theme";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getExploreItineraries());

    if (!user) {
      const oldToken = localStorage.getItem("token");
      if (oldToken) {
        dispatch(fetchUser(oldToken))
          .unwrap()
          .then(() => {
            if (token) {
              dispatch(getItinerariesAsync());
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
            <Route
              path="/itinerary/:explore?/:id"
              element={<ItineraryDetails />}
            />
            <Route path="/profile/:personalize?" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
