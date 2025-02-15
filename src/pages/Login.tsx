import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext"; // Context function for state management

const Login = () => {
  // State for the form fields
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Consume the login function from AuthContext
  const { login } = useContext(AuthContext);

  // Handlers for input changes
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const { access, refresh } = await loginUser(username, password);
      login(access, refresh);
      navigate("/"); // Redirect to Dashboard or another protected route
    } catch (err: any) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: "10%",
        p: 2,
        borderRadius: 0,
      }}
    >
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="caption" gutterBottom>
            Don't have an account yet?{" "}
            <Link component={RouterLink} to="/signup">
              Sign Up
            </Link>
          </Typography>
        </Box>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
