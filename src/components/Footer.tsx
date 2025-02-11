import { Box, Typography, Paper } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        py: 2,
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Paper sx={{ maxWidth: "max-content", backgroundColor: "#fdfd96" }}>
        <Typography variant="body1">
          © {new Date().getFullYear()} Flashcard App. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Footer;
