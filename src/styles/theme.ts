// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ff6b6b" }, // Bright orange
    secondary: { main: "#ffa0a0" },
    background: { default: "#f5f5f5" },
    text: { primary: "#000", secondary: "#333" },
    error: { main: "#cd5c5c" },
  },
  typography: {
    fontFamily: `Lexend Mega, sans-serif`,
    allVariants: {
      letterSpacing: "-2px", // Shrink letter spacing
    },
    // h1: { fontWeight: 900, fontSize: "3rem", letterSpacing: "1px" },
    // h2: { fontWeight: 800, fontSize: "2.5rem", letterSpacing: "1px" },
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    subtitle1: { color: "#333" },
    body1: { color: "#000" },
    body2: { color: "#333" },
    // h6: { fontWeight: 500 },

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
          // backgroundColor: "#f5f5f5",
          // fontWeight: 600,
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
          // backgroundImage: "none",
          // backgroundColor: "transparent",
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
    // Style the input label
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Lexend Mega", sans-serif`,
          // fontWeight: "bold",
          color: "black",
          // Optional: Adjust the label when focused
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    // If you have helper text or other elements, style them similarly
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: `"Lexend Mega", sans-serif`,
          color: "#333",
        },
      },
    },
    // You can also override MuiTextField if needed
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "8px 0",
        },
      },
    },
    // Other components...
  },
  // Optionally, you can add other customizations here.
  // ".paper-background" : {}
});

export default theme;
