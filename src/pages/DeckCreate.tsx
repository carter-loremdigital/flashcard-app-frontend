import { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";

interface CardData {
  question: string;
  answer: string;
}

type Props = {};

const DeckCreate = (props: Props) => {
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

    // Build the deck payload (you can adjust property names based on your backend)
    const deckPayload = {
      name: title,
      description,
      flashcards: cards, // Assuming your backend accepts an array of flashcards
    };

    // For now, log the payload; later integrate with your backend API (e.g., using Axios)
    console.log("Deck payload:", deckPayload);

    // TODO: Make API call to create the deck.
    // Example:
    // try {
    //   await api.post("/decks/", deckPayload);
    //   // Redirect or show success message.
    // } catch (err) {
    //   setError("Failed to create deck. Please try again.");
    // }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Deck
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Save Deck Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // fullWidth
            sx={{ mb: 4, mt: 2 }}
          >
            Save Deck
          </Button>
          <Button href="/" color="error">
            Cancel
          </Button>
        </Box>
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

        {/* Section for Adding Cards */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Add Cards
        </Typography>
        <TextField
          label="Card Question"
          value={cardQuestion}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCardQuestion(e.target.value)
          }
          fullWidth
          margin="normal"
          //   required
        />
        <TextField
          label="Card Answer"
          value={cardAnswer}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCardAnswer(e.target.value)
          }
          fullWidth
          margin="normal"
          //   required
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
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6">{card.question}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">{card.answer}</Typography>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="text"
                    onClick={() => handleDeleteCard(index)}
                    color="error"
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
  );
};

export default DeckCreate;
