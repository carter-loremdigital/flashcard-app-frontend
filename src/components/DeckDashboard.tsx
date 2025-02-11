import {
  Container,
  Typography,
  Box,
  Grid2,
  Alert,
  Divider,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api";
import { Link as RouterLink } from "react-router-dom";

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
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Your Decks
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
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
                // borderRadius: 2,
                height: 160,
                boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#000",

                backgroundColor: "powderblue",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                ":hover": {
                  boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
                  transform: "rotate(2deg)", // slight rotation on hover
                },
              }}
            >
              <Typography variant="h6">+ Create a new deck</Typography>
            </Box>
          </Link>
        </Grid2>
        {decks.map((deck, index) => (
          <Grid2 key={deck.id} size={{ xs: 12, md: 4 }}>
            <Link
              component={RouterLink}
              to={`/decks/${deck.id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  p: 2,
                  border: "3px solid",
                  borderColor: "black",
                  // borderRadius: 2,
                  height: 160,
                  color: "#000",
                  backgroundColor: "#f5f5f5",
                  // backgroundColor: "#fdfd96",
                  overflow: "hidden",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  ":hover": {
                    boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
                    transform: index % 2 ? "rotate(2deg)" : "rotate(-2deg)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {deck.name}
                </Typography>
                <Divider
                  sx={(theme) => ({
                    // my: 1,
                    mb: 1,
                    mx: -2,
                    borderBottomWidth: 2,
                    borderColor: theme.palette.secondary.main,
                  })}
                  variant="fullWidth"
                />
                <Box
                  sx={{
                    // display: "flex",
                    height: "100%",
                    // Create blue horizontal lines using a repeating linear gradient
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent, transparent 19px, lightblue 19px, lightblue 20px)",
                    backgroundSize: "100% auto",
                    mx: -2,
                    px: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 6, // Limit to 4 lines
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {deck.description ? deck.description : "No description"}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default DeckDashboard;
