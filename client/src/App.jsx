import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyItineraries from "./pages/MyItineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import theme from "./theme";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { setUser } from "./redux/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      dispatch(setUser(decodedUser));
    }
  }, [dispatch]);

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
