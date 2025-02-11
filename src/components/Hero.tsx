import { Container, Typography, Box, Button, Stack } from "@mui/material";

type Props = {};

const Hero = (props: Props) => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center" }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard App!!!
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Some more text goes here :)
        </Typography>
      </Box>
      <Box>
        <Button href="/login">Log In</Button>
        <Button href="/signup">Sign Up</Button>
      </Box>
    </Container>
  );
};

export default Hero;
