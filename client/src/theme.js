import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: "#3D52A0", // custom-blue-dark
    },
    secondary: {
      main: "#7091E6", // custom-blue-light
    },
    background: {
      default: "#EDE8F5", // custom-very-light-gray
    },
    text: {
      primary: "#3D52A0", // custom-blue-dark
      secondary: "#8697C4", // custom-blue-gray
    },
  },
});

export default theme;
