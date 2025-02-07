import { Box, Typography } from "@mui/material";
type Props = {};

const Footer = (props: Props) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Flashcard App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
