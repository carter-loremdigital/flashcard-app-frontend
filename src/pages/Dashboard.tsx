import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Hero from "../components/Hero";
import DeckDashboard from "../components/DeckDashboard";

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return <>{isAuthenticated ? <DeckDashboard /> : <Hero />}</>;
};

export default Dashboard;
