// Login.js
// This file defines the Login component, which allows users to log in.

import React, { useState } from "react"; // Import React hooks
import { TextField, Button, Container, Typography, Box } from "@mui/material"; // Import Material-UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth } from "../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function

// Login component
const Login = ({ setUser }) => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle login
  const handleLogin = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUser(user); // Update user state in App.js
        navigate("/"); // Redirect to home page
      } catch (error) {
        console.error("Error logging in:", error);
        setError("Invalid email or password.");
      }
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <Container style={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Login
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography variant="body2" style={{ marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Button color="primary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login; // Export the Login component