import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import DeckDetail from "./pages/DeckDetail";
import DeckCreate from "./pages/DeckCreate";
import DeckEdit from "./pages/DeckEdit";
import DeckStudy from "./pages/DeckStudy";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/decks/:deckId" element={<DeckDetail />} />
              <Route path="/decks/create" element={<DeckCreate />} />
              <Route path="/decks/:deckId/edit" element={<DeckEdit />} />
              <Route path="/decks/:deckId/study" element={<DeckStudy />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
