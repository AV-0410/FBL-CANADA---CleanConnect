// About.js
// This file defines the About page, which provides information about the team and mission.

import React from "react";
import { Typography, Container, Box, Grid, Paper, Avatar } from "@mui/material"; // Import Material-UI components
import { motion } from "framer-motion"; // Import motion for animations
import haaziqImage from "../images/haaziq.jpg"; // Import team member images
import navkaranImage from "../images/navkaran.jpg";
import anshImage from "../images/ansh.jpg";

// About component
const About = () => {
  // Array of team members
  const teamMembers = [
    {
      name: "Navkaran Saini",
      role: "Co-Founder & CEO",
      image: navkaranImage, // Image for Navkaran
    },
    {
      name: "Ansh Verma",
      role: "Co-Founder & CEO",
      image: anshImage, // Image for Ansh
    },
    {
      name: "Haaziq Dalvi",
      role: "Co-Founder & CEO",
      image: haaziqImage, // Image for Haaziq
    },
  ];

  return (
    <Container style={{ padding: "2rem" }}>
      {/* Header Section */}
      <Box textAlign="center" marginBottom="4rem">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
            About Us
          </Typography>
          <Typography variant="h6" style={{ color: "#4a5568" }}>
            We are passionate about creating a cleaner and greener world.
          </Typography>
        </motion.div>
      </Box>

      {/* Mission Section */}
      <Box marginBottom="4rem">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
            Our Mission
          </Typography>
          <Typography variant="body1" style={{ color: "#4a5568", lineHeight: "1.8" }}>
            At CleanConnect, our mission is to empower communities to take action against environmental pollution. We
            believe that by working together, we can create a sustainable future for generations to come. Through our
            platform, we connect like-minded individuals and organizations to organize clean-up events and make a
            tangible impact.
          </Typography>
        </motion.div>
      </Box>

      {/* Values Section */}
      <Box marginBottom="4rem">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
                <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                  Sustainability
                </Typography>
                <Typography variant="body1" style={{ color: "#4a5568" }}>
                  We are committed to promoting sustainable practices and reducing waste.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
                <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                  Community
                </Typography>
                <Typography variant="body1" style={{ color: "#4a5568" }}>
                  We believe in the power of community to drive meaningful change.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
                <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                  Innovation
                </Typography>
                <Typography variant="body1" style={{ color: "#4a5568" }}>
                  We leverage technology to make clean-up efforts more efficient and impactful.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Box>

      {/* Team Section */}
      <Box>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 100, height: 100, margin: "0 auto 1rem" }}
                  />
                  <Typography variant="h6" style={{ color: "#38a169", fontWeight: "bold" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#4a5568" }}>
                    {member.role}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default About; // Export the About component