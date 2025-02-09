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
  Link as MUILink,
} from "@mui/material";
import api from "../api";

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
    <Container sx={{ py: 8 }}>
      <Box sx={{ mb: 2 }}>
        <MUILink href="/">Back</MUILink>
      </Box>

      <Typography variant="h4" gutterBottom>
        {deck?.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {deck?.description || "No description available."}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
        <Button href={`/decks/${deckId}/study`} variant="contained">
          Study
        </Button>
        <Button href={`/decks/${deckId}/edit`} variant="outlined">
          Edit
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
            <Box
              key={flashcard.id}
              sx={{
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6">{flashcard.question}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{flashcard.answer}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1">
            No flashcards found for this deck.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default DeckDetail;
