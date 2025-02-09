import {
  Container,
  Typography,
  Box,
  Grid2,
  Alert,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

type Props = {};

// Define a TypeScript interface for a Deck.
interface Deck {
  id: number;
  name: string;
  description?: string;
  owner: number;
  created_at: string;
}

const DeckDashboard = (props: Props) => {
  // State for decks, loading and error message.
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch decks from the backend on component mount
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        // Endpoint `/decks/` in project-level URL becomes `/api/decks/`
        const response = await api.get<Deck[]>("/decks/");
        setDecks(response.data);
      } catch (err: any) {
        console.error("Error fetching decks:", err);
        setError("Failed to fetch decks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  // Display loading message
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5">Loading decks...</Typography>
      </Container>
    );
  }

  // Display error message
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Decks
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <Link to="/decks/create" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                p: 2,
                border: "3px solid",
                borderColor: "black",
                borderRadius: 1,
                height: 160,
                boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "powderblue",
              }}
            >
              <Typography variant="h6">+ Create a new deck</Typography>
            </Box>
          </Link>
        </Grid2>
        {decks.map((deck) => (
          <Grid2 key={deck.id} size={{ xs: 6, md: 4 }}>
            <Link to={`/decks/${deck.id}`} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  p: 2,
                  border: "3px solid",
                  borderColor: "black",
                  borderRadius: 1,
                  height: 160,
                  backgroundColor: "snow",
                  overflow: "hidden",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                }}
              >
                <Typography variant="h6">{deck.name}</Typography>
                <Divider
                  color="lightpink"
                  sx={{ my: 1, mx: -2 }}
                  variant="fullWidth"
                />
                <Typography variant="body2">
                  {deck.description ? deck.description : "No description"}
                </Typography>
              </Box>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
    // <Grid2 size={{ xs: 6, md: 4 }}>Deck 4</Grid2>
  );
};

export default DeckDashboard;
