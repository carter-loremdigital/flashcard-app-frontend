import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import api from "../api";
import { Edit, Lightbulb } from "@mui/icons-material";
import BackBar from "../components/BackBar";
import Flashcard from "../components/Flashcard";

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

const DeckDetail = () => {
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
    <Container>
      <Box sx={{ borderRadius: 2 }}>
        <BackBar href="/" />

        <Box
          sx={{
            border: "3px solid black",
            borderTop: "none",
            backgroundColor: "white",
            p: 4,
            boxShadow: "6px 6px 0px black",

            overflow: "hidden",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {deck?.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {deck?.description || "No description available."}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between", sm: "end" },
              gap: 1,
              my: 2,
            }}
          >
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
                <Flashcard
                  id={flashcard.id}
                  question={flashcard.question}
                  answer={flashcard.answer}
                />
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
