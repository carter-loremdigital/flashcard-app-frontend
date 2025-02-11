import { Container, Typography, Box, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        mt: "10%",
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
          P.S. This is just a demo project - the database gets wiped every week!
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
    </Container>
  );
};

export default Hero;
