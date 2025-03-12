// Home.js
// This file defines the Home component, which serves as the landing page.

import React from "react"; // Import React
import { Button, Typography, Container, Box, Grid } from "@mui/material"; // Import Material-UI components
import { motion } from "framer-motion"; // Import motion for animations
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Import local images
import cleanUpImage from "../images/cleanup.jpg";
import communityImage from "../images/community.jpg";

// Home component
const Home = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle Get Started button click
  const handleGetStarted = () => {
    navigate("/events"); // Navigate to the Events page
  };

  return (
    <Container style={{ textAlign: "center", padding: "2rem" }}>
      {/* Heading */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h2" gutterBottom style={{ color: "#38a169", fontWeight: "bold" }}>
          Welcome to CleanConnect
        </Typography>
      </motion.div>
      <Typography variant="h5" gutterBottom style={{ color: "#4a5568", marginBottom: "2rem" }}>
        Join local community clean-up events and make a difference!
      </Typography>

      {/* Get Started Button */}
      <Button
        variant="contained"
        style={{
          backgroundColor: "#38a169", // Green color
          color: "white",
          padding: "0.75rem 2rem",
          fontSize: "1.1rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>

      {/* Additional Information */}
      <Box style={{ marginTop: "3rem" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
          Why CleanConnect?
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={6}>
            <img
              src={cleanUpImage} // Local image
              alt="Community Clean-Up"
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <Typography variant="h6" style={{ marginTop: "1rem", color: "#4a5568" }}>
              Join local clean-up events and contribute to a cleaner environment.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={communityImage} // Local image
              alt="Community Engagement"
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <Typography variant="h6" style={{ marginTop: "1rem", color: "#4a5568" }}>
              Connect with like-minded individuals and make a lasting impact.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box style={{ marginTop: "3rem" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
          Ready to Make a Difference?
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#38a169", // Green color
            color: "white",
            padding: "0.75rem 2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={handleGetStarted}
        >
          Join an Event
        </Button>
      </Box>
    </Container>
  );
};

export default Home; // Export the Home component