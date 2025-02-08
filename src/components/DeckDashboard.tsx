import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Grid2,
} from "@mui/material";

type Props = {};

const DeckDashboard = (props: Props) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Decks
      </Typography>
      <Grid2 container spacing={2}>
        {/* TODO: Fetch user decks from backend */}
        <Grid2 size={{ xs: 6, md: 4 }}>Deck 1</Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>Deck 2</Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>Deck 3</Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>Deck 4</Grid2>
      </Grid2>
    </Container>
  );
};

export default DeckDashboard;
