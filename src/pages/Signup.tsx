import { useState, ChangeEvent, FormEvent, useContext } from "react";
import {
  Alert,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "../api/auth"; // API functions to call the backend
import { AuthContext } from "../context/AuthContext"; // Context for authentication state

const Signup = () => {
  // State variables for form fields and error messages
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get the login function from context

  // Handlers for input changes
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission and validate that passwords match
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      // Create the new user via Django signup endpoint
      await signupUser(username, password);
      // Once the user is created, automatically log them in:
      const { access, refresh } = await loginUser(username, password);
      // Update AuthContext with the new tokens
      login(access, refresh);
      // Redirect the user to the dashboard (or any other protected route)
      navigate("/");
    } catch (err: any) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 400, margin: "auto", p: 2, borderRadius: 0, mt: "10%" }}
    >
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            margin="normal"
            required
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
