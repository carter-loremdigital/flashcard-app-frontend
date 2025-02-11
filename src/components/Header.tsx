import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
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
        border: "none",
      }}
    >
      <Toolbar>
        <Link component={RouterLink} to="/" underline="none">
          <Paper>
            <Typography
              variant="h5"
              component="div"
              sx={{
                textDecoration: "underline",
                textDecorationColor: "#ff6b6b",
                textDecorationStyle: "dashed",
                textUnderlineOffset: 6,
              }}
            >
              Just Flashcards
            </Typography>
          </Paper>
        </Link>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ backgroundColor: "#f5f5f5" }}
            >
              Log Out
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                href="/login"
                color="inherit"
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                Log In
              </Button>
              <Button
                href="/signup"
                color="inherit"
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
