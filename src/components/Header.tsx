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
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        // borderBottom: "1px solid lightblue",
        color: "black",
      }}
    >
      <Toolbar>
        <a href="/">
          <Typography variant="h5" component="div">
            Just Flashcards
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
