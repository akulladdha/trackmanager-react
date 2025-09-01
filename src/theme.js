import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1A1A1D",
      paper: "#2D2D34"
    },
    primary: {
      main: "#00C896",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FF6B6B",
      contrastText: "#FFFFFF"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0"
    }
  }
});

export default theme;
