// Sidebar.js
// This file defines the Sidebar component, which provides navigation links.

import React from "react";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material"; // Import Material-UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Sidebar component
const Sidebar = ({ open, onClose, user, handleLogout }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {/* Profile Button */}
        <ListItem button onClick={() => navigate("/profile")}>
          <ListItemText primary="Profile" /> {/* Link to the Profile page */}
        </ListItem>

        {/* Logout Button */}
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" /> {/* Button to log out the user */}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; // Export the Sidebar component