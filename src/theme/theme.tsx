import { createTheme } from "@mui/material/styles";
import i18n from "../translation/i18n";

const theme = createTheme({
  direction: i18n.dir() === "rtl" ? "rtl" : "ltr",
  palette: {
    primary: {
      main: "#244b62",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "rgb(247, 247, 247)",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
