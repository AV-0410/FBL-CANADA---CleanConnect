// Dashboard.js
// This file defines the Dashboard component, which displays user statistics and events.

import React, { useEffect, useState } from "react"; // Import React hooks
import { Typography, Button, Container, Box, Grid, Paper } from "@mui/material"; // Import Material-UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion"; // Import motion for animations

// Dashboard component
const Dashboard = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // State for user data
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []); // State for events
  const [createdEvents, setCreatedEvents] = useState([]); // State for events created by the user

  // Fetch user and events data when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setUser(storedUser);
    setEvents(storedEvents);

    // Filter events created by the logged-in user
    if (storedUser) {
      const userEvents = storedEvents.filter((event) => event.creator === storedUser.email);
      setCreatedEvents(userEvents);
    }
  }, []);

  // Handle creating a new event
  const handleCreateEvent = () => {
    navigate("/create-event"); // Navigate to the CreateEvent page
  };

  // Handle viewing events
  const handleViewEvents = () => {
    navigate("/events"); // Navigate to the Events page
  };

  return (
    <Container style={{ padding: "2rem" }}>
      {/* Header Section */}
      <Box textAlign="center" marginBottom="2rem">
        <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" style={{ color: "#4a5568" }}>
          Track your clean-up contributions and manage events.
        </Typography>
      </Box>

      {/* Statistics Section */}
      <Grid container spacing={4} marginBottom="2rem">
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
              <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                Events Joined
              </Typography>
              <Typography variant="h3" style={{ color: "#2d3748", fontWeight: "bold" }}>
                {user?.joinedEvents?.length || 0}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
              <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                Events Created
              </Typography>
              <Typography variant="h3" style={{ color: "#2d3748", fontWeight: "bold" }}>
                {createdEvents.length}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
              <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                Total Events
              </Typography>
              <Typography variant="h3" style={{ color: "#2d3748", fontWeight: "bold" }}>
                {events.length}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Quick Actions Section */}
      <Box marginBottom="2rem">
        <Typography variant="h5" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#38a169",
                color: "white",
                padding: "1rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={handleCreateEvent}
            >
              Create Event
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#38a169",
                color: "white",
                padding: "1rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={handleViewEvents}
            >
              View Events
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Created Events Section */}
      <Box>
        <Typography variant="h5" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
          Your Created Events
        </Typography>
        {createdEvents.length > 0 ? (
          <Grid container spacing={3}>
            {createdEvents.map((event) => (
              <Grid item xs={12} md={4} key={event.id}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Paper elevation={3} style={{ padding: "1.5rem", borderRadius: "10px" }}>
                    <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#4a5568", marginBottom: "1rem" }}>
                      <strong>Date:</strong> {event.date}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#4a5568" }}>
                      <strong>Location:</strong> {event.location}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" style={{ color: "#4a5568" }}>
            You haven't created any events yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard; // Export the Dashboard component