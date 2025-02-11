import { Container, Typography, Box, Grid2, Alert, Link } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api";
import { Link as RouterLink } from "react-router-dom";
import Deck from "./Deck";
import { Add } from "@mui/icons-material";

// Define a TypeScript interface for a Deck
interface Deck {
  id: number;
  name: string;
  description?: string;
  owner: number;
  created_at: string;
}

const DeckDashboard = () => {
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
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Your Decks
      </Typography>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Link
            component={RouterLink}
            to="/decks/create"
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                p: 2,
                border: "3px solid",
                borderColor: "black",
                height: 160,
                boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#000",
                backgroundColor: "#a7dbd8",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                ":hover": {
                  boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                  transform: "rotate(2deg)", // slight rotation on hover
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Add />
                <Typography variant="h6">Create a new deck</Typography>
              </Box>
            </Box>
          </Link>
        </Grid2>
        {decks.map((deck, index) => (
          <Grid2 key={deck.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link
              component={RouterLink}
              to={`/decks/${deck.id}`}
              style={{ textDecoration: "none" }}
            >
              <Deck
                index={index}
                name={deck.name}
                description={deck.description}
              />
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default DeckDashboard;
