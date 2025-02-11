import { Container, Typography, Box, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        // textAlign: "center",
        textAlign: "center",
        mt: "10%",
        // minHeight: "100vh",
        // minHeight: "200px", // Fill the viewport height
        // display: "flex", // Enable flex layout
        // flexDirection: "column", // Arrange children vertically
        // alignItems: "center", // Center children horizontally
        // justifyContent: "center", // Center children vertically
      }}
    >
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Just Flashcards
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Need to make some flashcards? You're in the right place.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          P.S. This is a demo project - the database gets wiped every week!
        </Typography>
        <Button
          href="/login"
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{ mt: 6 }}
        >
          Make Flashcards
        </Button>
      </Box>
      {/* <Box>
        <Button href="/login">Log In</Button>
        <Button href="/signup">Sign Up</Button>
      </Box> */}
    </Container>
  );
};

export default Hero;
