import { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Close, Save, Delete, Add } from "@mui/icons-material";
import BackBar from "../components/BackBar";
import { MAX_CARDS } from "../utils/arrayUtils";

interface CardData {
  question: string;
  answer: string;
}

const DeckCreate = () => {
  // State for deck title and description
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // State for the card currently being added
  const [cardQuestion, setCardQuestion] = useState<string>("");
  const [cardAnswer, setCardAnswer] = useState<string>("");

  // Array of added cards
  const [cards, setCards] = useState<CardData[]>([]);

  // Error message for form validation
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // Handler for adding a card to the deck
  const handleAddCard = () => {
    if (cardQuestion.trim() === "" || cardAnswer.trim() === "") {
      setError("Both question and answer are required for a card.");
      return;
    }
    // Append new card to the array
    setCards((prevCards) => [
      ...prevCards,
      { question: cardQuestion, answer: cardAnswer },
    ]);
    // Clear the card input fields and error
    setCardQuestion("");
    setCardAnswer("");
    setError("");
  };

  const handleDeleteCard = (indexToDelete: number) => {
    setCards((prevCards) =>
      prevCards.filter((_, index) => index !== indexToDelete)
    );
  };

  // Handler for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation: Deck title is required
    if (title.trim() === "") {
      setError("Deck title is required.");
      return;
    }

    const deckPayload = {
      name: title,
      description,
    };

    try {
      // 1. Create the deck first
      const deckResponse = await api.post("/decks/", deckPayload);
      const deckId = deckResponse.data.id; // Extract the deck ID from the response

      // 2. Build the flashcards payload by including the deck ID in each card
      const flashcardsPayload = cards.map((card) => ({
        question: card.question,
        answer: card.answer,
        deck: deckId,
      }));

      // 3. Send a bulk creation request for flashcards
      await api.post("/flashcards/bulk_create/", flashcardsPayload);

      navigate("/");
    } catch (err: any) {
      console.error("Error creating deck or flashcards:", err);
      setError("Failed to create deck. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        p: { xs: 0, sm: "inherit" },
      }}
    >
      <BackBar href="/" />

      <Box
        sx={(theme) => ({
          border: "3px solid black",
          borderTop: "none",
          backgroundColor: theme.palette.background.default,
          boxShadow: "6px 6px 0px black",
        })}
      >
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create a New Deck
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Deck Title Input */}
            <TextField
              label="Deck Title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              fullWidth
              margin="normal"
              required
            />

            {/* Deck Description Input */}
            <TextField
              label="Deck Description"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />

            {/* Cancel and Save buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", sm: "end" },
                gap: 1,
                mb: 4,
                mt: 2,
              }}
            >
              <Button href="/" color="error" startIcon={<Close />}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" startIcon={<Save />}>
                Save
              </Button>
            </Box>

            {/* Section for Adding Cards */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Add Cards ({cards.length})
            </Typography>
            <TextField
              label="Card Question"
              value={cardQuestion}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCardQuestion(e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Card Answer"
              value={cardAnswer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCardAnswer(e.target.value)
              }
              fullWidth
              margin="normal"
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddCard}
              sx={{ mt: 2 }}
              startIcon={<Add />}
              disabled={cards.length == MAX_CARDS}
            >
              Add Card
            </Button>

            {/* List of Added Cards */}
            {cards.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Cards Added:</Typography>
                {cards.map((card, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "3px solid black",
                      p: 2,
                      mb: 2,
                      boxShadow: "4px 4px 0px black",
                      backgroundColor: "#fffff0",
                    }}
                  >
                    <Typography variant="h6">Q: {card.question}</Typography>
                    <Divider
                      sx={(theme) => ({
                        my: 2,
                        borderBottomWidth: 2,
                        borderColor: theme.palette.primary.main,
                        borderBottomStyle: "dashed",
                      })}
                    />
                    <Typography variant="body1">A: {card.answer}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        variant="text"
                        onClick={() => handleDeleteCard(index)}
                        color="error"
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </form>
        </Container>
      </Box>
    </Container>
  );
};

export default DeckCreate;
