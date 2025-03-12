// SignUp.js
// This file defines the SignUp component, which allows users to create a new account.

import React, { useState } from "react"; // Import React hooks
import { TextField, Button, Container, Typography, Box } from "@mui/material"; // Import Material-UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth, db } from "../firebase"; // Import Firebase services
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

// SignUp component
const SignUp = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle sign-up
  const handleSignUp = async () => {
    // Basic validation
    if (email && password) {
      try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create a user document in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          email: user.email,
          joinedEvents: [], // Initialize with an empty array
          achievements: [], // Initialize with an empty array
        });

        // Redirect to the Login page
        alert("Sign-up successful! Please log in.");
        navigate("/login");
      } catch (error) {
        console.error("Error signing up:", error);
        setError(error.message); // Display error message to the user
      }
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <Container style={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box style={{ maxWidth: "300px", margin: "0 auto" }}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Typography variant="body2" style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Button color="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp; // Export the SignUp component