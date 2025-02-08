type Props = {};
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import DeckDashboard from "../components/DeckDashboard";

const Dashboard = (props: Props) => {
  const { isAuthenticated } = useContext(AuthContext);
  return <>{isAuthenticated ? <DeckDashboard /> : <Hero />}</>;
  //  <div>Dashboard</div>;
};

export default Dashboard;
