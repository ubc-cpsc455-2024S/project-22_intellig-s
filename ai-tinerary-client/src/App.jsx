import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./components/Login";
import MyItineraries from "./pages/MyItineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-itineraries" element={<MyItineraries />} />
          <Route path="/itineraries/:id" element={<ItineraryDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};


export default App;
