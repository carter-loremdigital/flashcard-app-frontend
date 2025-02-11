import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  TextField,
} from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Close, Save, Delete, Add } from "@mui/icons-material";
import BackBar from "../components/BackBar";

// TypeScript interfaces for Deck and Flashcard
interface Deck {
  id: number;
  name: string;
  description?: string;
}

interface Flashcard {
  id?: number; // id optional for new flashcards
  question: string;
  answer: string;
}

type Props = {};

const DeckEdit = (props: Props) => {
  // Extract deckId from the URL
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  // States for deck details, flashcards, loading and error
  const [deck, setDeck] = useState<Deck | null>(null);
  const [deckName, setDeckName] = useState<string>("");
  const [deckDescription, setDeckDescription] = useState<string>("");

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        // Fetch deck details (using deckId)
        const deckResponse = await api.get<Deck>(`/decks/${deckId}/`);
        const fetchedDeck = deckResponse.data;
        setDeck(fetchedDeck);
        setDeckName(fetchedDeck.name);
        setDeckDescription(fetchedDeck.description || "");

        // Fetch flashcards for this deck
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

  // Handlers for deck fields
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeckDescription(e.target.value);
  };

  // Handler to update flashcard fields in state
  const handleFlashcardChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    // Update card in flashcards array
    setFlashcards((prev) =>
      prev.map((card, idx) =>
        idx === index ? { ...card, [field]: value } : card
      )
    );
  };

  // Handler to delete a flashcard from state
  const handleDeleteFlashcard = (index: number) => {
    setFlashcards((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Handler to add a new blank flashcard
  const handleAddFlashcard = () => {
    setFlashcards((prev) => [...prev, { question: "", answer: "" }]);
  };

  // Handler for saving changes
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 1. Update the deck's basic details
      await api.put(`/decks/${deckId}/`, {
        name: deckName,
        description: deckDescription,
      });

      // 2. Delete all existing flashcards for this deck using the bulk deletion endpoint
      // This approach will work for now since flashcard IDs are not referenced anywhere else
      await api.delete("/flashcards/bulk_delete/", {
        params: { deck: deckId },
      });

      // 3. Build the flashcards payload including the deck id
      const flashcardsPayload = flashcards.map((card) => ({
        question: card.question,
        answer: card.answer,
        deck: deckId,
      }));

      // 4. Create flashcards in bulk using the bulk creation endpoint
      await api.post("/flashcards/bulk_create/", flashcardsPayload);

      // Redirect to the deck detail page after saving.
      console.log("Deck and flashcards updated successfully!");
      navigate(`/decks/${deckId}`);
    } catch (err: any) {
      console.error("Error saving deck changes:", err);
      setError("Failed to update deck. Please try again.");
    }
  };

  // Handler to delete the deck (and cascade delete its flashcards)
  const handleDeleteDeck = async () => {
    // Ask for user confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck and all its flashcards?"
    );

    if (!confirmed) {
      // If the user cancels, exit the function
      return;
    }

    try {
      // Send DELETE request to the deck endpoint
      await api.delete(`/decks/${deckId}/`);
      // After successful deletion, navigate to home
      navigate("/");
    } catch (err: any) {
      console.error("Error deleting deck:", err);
      setError("Failed to delete deck. Please try again.");
    }
  };

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
      <BackBar href={`/decks/${deckId}`} />

      <Box
        sx={{
          border: "3px solid black",
          borderTop: "none",
          backgroundColor: "white",
          p: 4,
          boxShadow: "6px 6px 0px black",
          // borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Edit {deck?.name}
        </Typography>
        <form onSubmit={handleSave}>
          {/* Editable deck fields */}
          <TextField
            label="Deck Title"
            value={deckName}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Deck Description"
            value={deckDescription}
            onChange={handleDescriptionChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          {/* <Divider sx={{ my: 3 }} />
        
        */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteDeck}
              startIcon={<Delete />}
            >
              Delete Deck
            </Button>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate(`/decks/${deckId}`)}
                startIcon={<Close />}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                startIcon={<Save />}
                sx={{ color: "white" }}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Edit Flashcards
            </Typography>
            {flashcards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  boxShadow: "4px 4px 0px black",
                  backgroundColor: "#fffff0",
                }}
              >
                <TextField
                  label="Question"
                  value={card.question}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFlashcardChange(index, "question", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  required
                />
                <Divider
                  sx={(theme) => ({
                    my: 2,
                    borderBottomWidth: 2,
                    borderColor: theme.palette.primary.main,
                    borderBottomStyle: "dashed",
                  })}
                />
                <TextField
                  label="Answer"
                  value={card.answer}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFlashcardChange(index, "answer", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  required
                />
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    color="error"
                    onClick={() => handleDeleteFlashcard(index)}
                    sx={{ mt: 1, backgroundColor: "#fff" }}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddFlashcard}
              sx={{ mb: 3 }}
              startIcon={<Add />}
            >
              Add New Card
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default DeckEdit;
