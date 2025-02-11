import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
  Button,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import api from "../api";
import { Check, Close } from "@mui/icons-material";
import { shuffleArray } from "../utils/arrayUtils";

// Define a TypeScript interface for Flashcard.
interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const DeckStudy = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Study state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await api.get<Flashcard[]>("/flashcards/", {
          params: { deck: deckId },
        });
        setFlashcards(shuffleArray(response.data)); // Shuffle before setting state
      } catch (err: any) {
        console.error("Error fetching flashcards:", err);
        setError("Failed to fetch flashcards.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [deckId]);

  // Handler to flip the card
  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  // Handler when the user marks the card as correct or incorrect
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    // Move to the next card
    const nextIndex = currentIndex + 1;
    if (nextIndex >= flashcards.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(nextIndex);
      // Set flipped back to false to show question side of next card
      setFlipped(false);
    }
  };

  // Calculate progress percentage
  const progress =
    flashcards.length > 0 ? (currentIndex / flashcards.length) * 100 : 0;

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading flashcards...
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

  // If the study session is complete, show the final score.
  if (completed) {
    return (
      <Container sx={{ textAlign: "center", mt: "10%" }}>
        <Paper
          sx={{
            borderRadius: 0,
            border: "3px solid",
            borderColor: "black",
            boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Study Session Complete!
          </Typography>
          <Typography variant="h6">
            You answered {correctCount} out of {flashcards.length} correctly.
          </Typography>
          <Box
            sx={{ mt: 4, display: "flex", gap: 1, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{
                color: "white",
              }}
            >
              Restart
            </Button>
            <Button href="/" variant="outlined">
              Home
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Get the current flashcard
  const currentCard = flashcards[currentIndex];

  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      {/* Progress bar */}
      <Stack gap={1}>
        <Typography variant="h5">Progress</Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          color="info"
          sx={{
            borderRadius: 0,
            height: "24px",
            border: "3px solid",
            borderColor: "black",
            boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
          }}
        />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Card {currentIndex + 1} of {flashcards.length}
        </Typography>
      </Stack>

      {/* Flashcard display */}
      <Box
        onClick={handleFlip}
        sx={{
          cursor: "pointer",
          borderRadius: 0,
          border: "3px solid",
          borderColor: "black",
          boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
          p: 4,
          my: 4,
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: flipped ? "grey.100" : "white",
        }}
      >
        <Typography variant="h5">
          {flipped ? currentCard.answer : currentCard.question}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="caption">
          Hint: Click the card to flip it over!
        </Typography>
      </Box>
      {/* Answer buttons (only visible when flipped) */}
      {flipped && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => handleAnswer(false)}
            startIcon={<Close />}
          >
            Incorrect
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAnswer(true)}
            startIcon={<Check />}
          >
            Correct
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default DeckStudy;
