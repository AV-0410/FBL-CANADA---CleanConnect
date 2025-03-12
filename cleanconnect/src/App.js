// App.js
// This file defines the main App component, which serves as the entry point for the application.

import React, { useState, useEffect } from "react"; // Import React hooks
import { Route, Routes, Link, useNavigate, useLocation } from "react-router-dom"; // Import routing hooks
import { Button, Typography, Container, AppBar, Toolbar, IconButton } from "@mui/material"; // Import Material-UI components
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon
import Home from "./pages/Home"; // Import pages
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import logo from "./images/logo.png"; // Import logo
import "./App.css"; // Import styles
import { auth } from "./firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth function

// App component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [user, setUser] = useState(null); // State for user authentication
  const [eventsUpdated, setEventsUpdated] = useState(false); // State to trigger re-fetch of events
  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook for current location

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Redirect to login if user is not logged in (except on Sign Up page)
  useEffect(() => {
    if (!user && location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  // Handle logout
  const handleLogout = () => {
    auth.signOut(); // Sign out the user
    setUser(null); // Clear the user state
    navigate("/login"); // Redirect to the login page
  };

  // Toggle sidebar
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  // Function to re-fetch events
  const reFetchEvents = () => {
    setEventsUpdated((prev) => !prev); // Toggle state to trigger re-fetch
  };

  return (
    <>
      {/* Header with Menu Icon */}
      <AppBar position="static" style={{ backgroundColor: "#38a169" }}>
        <Toolbar>
          {/* Menu Icon (only visible when user is logged in) */}
          {user && (
            <IconButton edge="start" color="inherit" onClick={handleOpenSidebar}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <img
            src={logo}
            alt="CleanConnect Logo"
            style={{ height: "40px", marginRight: "1rem" }}
          />

          {/* App Name */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CleanConnect
          </Typography>

          {/* Navigation Links */}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/events">
                Events
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar (only visible when user is logged in) */}
      {user && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleCloseSidebar}
          user={user}
          handleLogout={handleLogout}
        />
      )}

      {/* Routes */}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events onEventJoined={reFetchEvents} />} />
          <Route path="/dashboard" element={<Dashboard eventsUpdated={eventsUpdated} />} />
          <Route path="/create-event" element={<CreateEvent onEventCreated={reFetchEvents} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </>
  );
};

export default App; // Export the App component