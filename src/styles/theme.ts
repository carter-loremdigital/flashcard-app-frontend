// theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: { main: "#ff6b6b" }, // Salmon
    secondary: { main: "#ffa0a0" },
    background: { default: "#f5f5f5" },
    text: { primary: "#000", secondary: "#333" },
  },
  typography: {
    fontFamily: `Lexend Mega, sans-serif`,
    allVariants: {
      letterSpacing: "-2px", // Shrink letter spacing
    },
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    body1: { color: "#000" },
    body2: { color: "#333" },
    subtitle1: { color: "#333" },

    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          border: "3px solid black",
          boxShadow: "4px 4px 0px black",
          "&:hover": {
            boxShadow: "6px 6px 0px black",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "3px solid black",
          boxShadow: "6px 6px 0px black",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "3px solid black",
          boxShadow: "4px 4px 0px black",
          borderRadius: "8px",
          padding: "16px",
        },
      },
    },

    // Newbrutalist Text Input Styles for Outlined Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          // Apply box shadow to notched outline to prevent label from overlapping
          backgroundColor: "white",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            boxShadow: "6px 6px 0px black",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            boxShadow: "6px 6px 0px black",
          },
        },
        notchedOutline: {
          border: "3px solid black",
          boxShadow: "4px 4px 0px black",
        },
      },
    },
    // Style input label
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Lexend Mega", sans-serif`,
          color: "black",
          // Optional: Adjust the label when focused
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "8px 0",
        },
      },
    },
    // Other components...
  },
});

theme = responsiveFontSizes(theme);

export default theme;
