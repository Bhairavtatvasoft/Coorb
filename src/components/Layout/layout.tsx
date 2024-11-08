import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box className="layoutContainer">
      <CssBaseline />
      <Header onSidebarToggle={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <Box
        component="main"
        className={`main-content ${
          isSidebarOpen ? "open-sidebar" : "closed-sidebar"
        }`}
      >
        <Toolbar sx={{ height: "64px" }} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
