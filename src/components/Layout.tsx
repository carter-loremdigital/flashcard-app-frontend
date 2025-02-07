import React, { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container component="main" sx={{ flex: 1, mt: 4, mb: 4 }}>
        {children}
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
