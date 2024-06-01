import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MyItineraries from "./pages/MyItineraries";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-itineraries" element={<MyItineraries />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
