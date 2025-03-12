// CreateEvents.js
// This file defines the CreateEvent component, which allows users to create new events.

import React, { useState } from "react"; // Import React hooks
import { TextField, Button, Container, Typography, Box } from "@mui/material"; // Import Material-UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { db, auth } from "../firebase"; // Import Firebase services
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

// CreateEvent component
const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState(""); // State for event title
  const [date, setDate] = useState(""); // State for event date
  const [location, setLocation] = useState(""); // State for event location
  const [description, setDescription] = useState(""); // State for event description
  const navigate = useNavigate(); // Hook for programmatic navigation
  const user = auth.currentUser; // Get the current user from Firebase

  // Function to handle event creation
  const handleCreateEvent = async () => {
    if (title && date && location && description) {
      const newEvent = {
        title,
        date,
        location,
        description,
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        creator: user.email, // Add the creator's email
      };

      try {
        // Save the event to Firestore
        const docRef = await addDoc(collection(db, "events"), newEvent);
        console.log("Event created with ID:", docRef.id);
        onEventCreated(); // Trigger re-fetch of events
        navigate("/events"); // Redirect to the events page
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Failed to create event. Please try again.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Container style={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Create a New Event
      </Typography>
      <Box style={{ maxWidth: "500px", margin: "0 auto" }}>
        <TextField
          label="Event Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={handleCreateEvent}
        >
          Create Event
        </Button>
      </Box>
    </Container>
  );
};

export default CreateEvent; // Export the CreateEvent component