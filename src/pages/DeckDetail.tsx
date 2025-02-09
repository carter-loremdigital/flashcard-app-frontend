import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import api from "../api";
import { Edit, Lightbulb } from "@mui/icons-material";
import BackBar from "../components/BackBar";
// import { X } from "@mui/icons-material";

// TypeScript interfaces for Deck and Flashcard
interface Deck {
  id: number;
  name: string;
  description?: string;
}

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

type Props = {};

const DeckDetail = (props: Props) => {
  // Extract deckId from the URL
  const { deckId } = useParams<{ deckId: string }>();

  // States for deck details, flashcards, loading and error
  const [deck, setDeck] = useState<Deck | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        // Fetch deck details (using deckId)
        const deckResponse = await api.get<Deck>(`/decks/${deckId}/`);
        setDeck(deckResponse.data);

        // Fetch flashcards for this deck.
        // Assuming your flashcards endpoint can filter by deck ID via query parameters:
        const flashcardsResponse = await api.get<Flashcard[]>("/flashcards/", {
          params: { deck: deckId },
        });
        setFlashcards(flashcardsResponse.data);
      } catch (err: any) {
        console.error("Error fetching deck details:", err);
        setError("Failed to fetch deck details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeckAndFlashcards();
  }, [deckId]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading deck details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 8, px: 0 }}>
      <Box sx={{ borderRadius: 2 }}>
        <BackBar href="/" />

        <Box
          sx={{
            border: "3px solid black",
            borderTop: "none",
            backgroundColor: "white",
            p: 4,
            boxShadow: "4px 4px 0px black",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {deck?.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {deck?.description || "No description available."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
            <Button href={`/decks/${deckId}/edit`} variant="outlined">
              <Edit sx={{ marginRight: "4px" }} />
              Edit
            </Button>
            <Button
              href={`/decks/${deckId}/study`}
              variant="contained"
              disabled={flashcards?.length ? false : true}
            >
              <Lightbulb sx={{ marginRight: "4px" }} />
              Study
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            {flashcards.length > 0 ? (
              flashcards.map((flashcard) => (
                <Box
                  key={flashcard.id}
                  sx={{
                    border: "2px solid black",
                    // borderColor: "grey.300",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    boxShadow: "2px 2px 0px black",
                    backgroundColor: "#fffff0",
                  }}
                >
                  <Typography variant="h6">Q: {flashcard.question}</Typography>
                  <Divider
                    sx={{
                      my: 2,
                      borderBottomWidth: 2,
                      borderColor: "#ff5722",
                      // borderColor: "lightblue",
                      borderBottomStyle: "dashed",
                    }}
                  />
                  <Typography variant="body1">A: {flashcard.answer}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1">
                No flashcards found for this deck.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DeckDetail;
