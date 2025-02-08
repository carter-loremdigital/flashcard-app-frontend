import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <a href="/">
          <Typography variant="h6" component="div">
            Flashcard App
          </Typography>
        </a>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          {isAuthenticated ? (
            <Button onClick={handleLogout} color="inherit">
              Log Out
            </Button>
          ) : (
            <Button href="/login" color="inherit">
              Log In
            </Button>
          )}

          {!isAuthenticated && (
            <Button href="/signup" color="inherit">
              Sign Up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
