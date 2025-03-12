// Events.js
// This file defines the Events component, which displays a list of upcoming events.

import React, { useEffect, useState } from "react"; // Import React hooks
import { Card, CardContent, Typography, Button, Container, Grid, Box } from "@mui/material"; // Import Material-UI components
import { motion } from "framer-motion"; // Import motion for animations
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { db, auth } from "../firebase"; // Import Firebase services
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

// Events component
const Events = () => {
  const [events, setEvents] = useState([]); // State for events
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle joining an event
  const handleJoinEvent = async (eventId) => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to join an event.");
      return;
    }

    try {
      // Check if the user document exists
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // If the user document doesn't exist, create it
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          joinedEvents: [], // Initialize with an empty array
          achievements: [], // Initialize with an empty array
        });
      }

      // Add the event ID to the user's joinedEvents array
      await updateDoc(userRef, {
        joinedEvents: arrayUnion(eventId),
      });

      alert("You have successfully joined the event!");
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join the event. Please try again.");
    }
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold", textAlign: "center" }}>
        Upcoming Events
      </Typography>

      {/* Create Event Button */}
      <Box textAlign="center" marginBottom="2rem">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#38a169",
            color: "white",
            fontWeight: "bold",
            padding: "0.75rem 2rem",
          }}
          onClick={() => navigate("/create-event")}
        >
          Create Event
        </Button>
      </Box>

      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom style={{ color: "#38a169", fontWeight: "bold" }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#4a5568", marginBottom: "1rem" }}>
                    <strong>Date:</strong> {event.date}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#4a5568", marginBottom: "1rem" }}>
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#4a5568", marginBottom: "1rem" }}>
                    {event.description}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#38a169",
                      color: "white",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                    onClick={() => handleJoinEvent(event.id)} // Add onClick handler
                  >
                    Join Event
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Events; // Export the Events component